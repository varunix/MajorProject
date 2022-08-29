const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./configs/mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportLocal = require('./configs/passport-local-strategy');
const session = require('express-session');

app.use(express.static('./assets'));

app.use(express.urlencoded());
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
    }
}));

app.use(passport.initialize());
app.use(passport.session());

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