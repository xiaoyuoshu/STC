var express = require('express');
var router = express.Router();

router.get('/:Sno', function(req, res, next) {
    req.params.Sno;
    res.render('student',{ Sno: req.params.Sno });
});

module.exports = router;