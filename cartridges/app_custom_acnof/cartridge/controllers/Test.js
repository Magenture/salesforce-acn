'use strict';

var server = require('server');

server.get('Show', function(req, res, next) {
    //res.render("Hello World!");
    res.json({ value: 'Hello World!!!'});
    next();
});

module.exports = server.exports();
