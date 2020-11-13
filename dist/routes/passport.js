import passport from 'passport';
import LocalStrategy  from 'passport-local/lib/strategy';

import User from '../database/services/Users/User_Service';
import {UserSearch,UserByUsername} from '../database/services/Users/User_Service';
import bcrypt from 'bcrypt';

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
        UserSearch(id)
        .then(user => done(null, user));
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        UserByUsername(username)
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




