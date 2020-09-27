if (process.env.NODE_ENV === "development"){
    require('dotenv').config();
}
require('@babel/polyfill');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const toastr = require('express-toastr');
const routes = require('./routes');
const passport = require('passport');
const flash = require('connect-flash');
require('./database/config/config');

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

// Load express-toastr
// You can pass an object of default options    <script>

require('./routes/passport');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(toastr({
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "9000",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}));
// Routes
app.use('/', routes);


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
