if (process.env.NODE_ENV === "development"){
    require('dotenv').config();
}
require('@babel/polyfill');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, '..', 'public')));

// Passport Auth
app.use(session({secret: 'Bakery_secret', resave: true, saveUninitialized: true}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

var server = app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);

// That's is going to catch all the unhandled errors on the application
// to avoid the application crash
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION', 'Shutting down...');
    console.log(err);
    // Code: 0 success
    // 1 - uncaught exception
    server.close(() => {
        // Give time to server to complete all pending request!
        process.exit(1);
    })
});
