const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

const User = require('../database/services/Users/User_Service');
const bcrypt = require('bcrypt');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.UserSearch(id)
        .then(user => done(null, user));
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.UserByUsername(username)
            .then(user => {
                if (!user) {
                    return done(null, false, {message: 'Usuario incorrecto.'});
                }
                bcrypt.compare(password, user.password)
                    .then(match => {
                        if (match) return done(null, user);
                        return done(null, false, {message: 'Contraseña incorrecta.'});
                    })
                    .catch(err => done(err))
            })
            .catch(e => done(e));
    }
));




