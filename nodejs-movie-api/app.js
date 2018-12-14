'use strict';
const debug = require('debug');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const movie = require('./routes/movie');
const director = require('./routes/director');

const app = express();

//db connection
const db = require('./helper/db.js')();

//config
const config = require('./config.js');

app.set('api_secret_key', config.api_secret_key);

//middleware

const verifyToken = require('./middleware/verify-token');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', verifyToken);
app.use('/api/movies', movie);
app.use('/api/directors', director); 

// catch 404 and forward to error handler
app.use((req, res, next)=> {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.json({ error: err.message, code: err.code });
});

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), ()=> {
    debug('Express server listening on port ' + server.address().port);
});

module.exports = app;
