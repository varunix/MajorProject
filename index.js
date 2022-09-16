const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./configs/mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportLocal = require('./configs/passport-local-strategy');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./configs/middleware');
const { config } = require('dotenv');

config();

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.static('./assets'));
//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codeial_development',
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongod setup ok')
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/', require('./routes'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running successfully: ${port}`);
});