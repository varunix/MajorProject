const passport = require('passport');
const JWTStrategy = require('passport-JWT').Strategy;
const ExtractJWT = require('passport-JWT').ExtractJwt; //to extract JWT from the header

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done) {

    User.findById(jwtPayLoad._id, function(err, user) {
        if(err) {
            console.log('Error in finding the user from JWT');
            return;
        }

        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }

    });
}));

module.exports = passport;