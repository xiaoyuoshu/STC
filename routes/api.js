var express = require('express');
var Database = require('./mySQL_connect');
var router = express.Router();

router.post('/login_submit',function (req, res, next) {
    var login_data = req.body;
    console.log(req.body);
    if(login_data.submit_type==0){
        if(login_data.account == "admin" && login_data.password == "sql_course"){
            console.log("LOG admin登陆成功");
            res.send({
                status:200,
                success: true,
                url:'/admin'
            });
        } else {
            res.send({
                status:200,
                success: false,
                url:''
            });
        }
    }else if(login_data.submit_type==1){
        new Database().queryTeacher({
            Tno:login_data.account,
            Tkey:login_data.password
        },res);
    }else {
        new Database().queryStudent({
            Sno:login_data.account,
            Skey:login_data.password
        },res);
    }
})

router.get('/get_Sc',function (req, res, next) {
    new Database().querySc(req.query,res);
})

router.get('/get_Course_Student/:id',function (req, res, next) {
    var data = {
        Cno:req.params.id
    };
    new Database().queryCourse_Student(data,res);
})

router.get('/get_Teacher',function (req, res, next) {
    new Database().queryTeacher(req.query,res);
})

router.get('/get_Student',function (req, res, next) {
    new Database().queryStudent(req.query,res);
})

router.get('/get_Teacher_Course',function (req, res, next) {
    new Database().queryTeacher_Course(req.query,res);
})


router.get('/get_Sc_Major',function (req, res, next) {
    console.log(req.query)
    new Database().querySc_Major(req.query,res);
})

router.get('/get_Major_Teacher/:id',function (req, res, next) {
    var data = {
        Mno:req.params.id
    };
    new Database().queryMajor_Teacher(data,res);
})

router.get('/get_Student_Course/:id',function (req, res, next) {
    var data = {
        Sno:req.params.id
    };
    new Database().queryStudent_Course(data,res);
})

router.get('/get_SelectableCourse/:id',function (req, res, next) {
    var data = {
        Sno:req.params.id
    };
    new Database().querySelectableCourse(data,res);
})

router.get('/get_Major_Student/:id',function (req, res, next) {
    var data = {
        Mno:req.params.id
    };
    new Database().queryMajor_Student(data,res);
})

router.get('/queryALLCourse',function (req, res, next) {
    new Database().queryALLCourse(req.query,res);
})

router.post('/updateTeacher',function (req, res, next) {
    new Database().updateTeacher(req.body,res);
})
router.post('/updateStudent',function (req, res, next) {
    new Database().updateStudent(req.body,res);
})
router.post('/updateCourse',function (req, res, next) {
    new Database().updateCourse(req.body,res);
})
router.post('/updateScore',function (req, res, next) {
    new Database().updateScore(req.body,res);
})
router.post('/insertStudent',function (req, res, next) {
    new Database().insertStudent(req.body,res);
})
router.post('/insertTeacher',function (req, res, next) {
    new Database().insertTeacher(req.body,res);
})
router.post('/insertCourse',function (req, res, next) {
    new Database().insertCourse(req.body,res);
})
router.post('/selectCourse',function (req, res, next) {
    new Database().selectCourse(req.body,res);
})
module.exports = router;