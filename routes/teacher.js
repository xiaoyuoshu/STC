var express = require('express');
var router = express.Router();

router.get('/:Tno', function(req, res, next) {
    req.params.Tno;
    res.render('teacher',{ Tno: req.params.Tno });
});

module.exports = router;