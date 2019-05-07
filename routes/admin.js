var express = require('express');
var router = express.Router();
var Database = require('./mySQL_connect');

router.get('/', function(req, res, next) {
    res.render('admin');
});

module.exports = router;
