var mysql = require('mysql');

/*
填写每个函数的sql变量和params变量，两个变量类似于printf()函数的用法
sql变量为字符串，包含sql语句主体部分，输入参数由'?'占位
params为输入参数列表，依次替换掉sql语句中的'?'

data为请求数据的集合

如查询专业号为'Mno'、性别为'Tsex'的所有教师
则
sql = 'select * from Teacher where Mno = ? and Tsex = ?'
params = [data.Mno,data.Tsex]

增删查改都只需要更改这两个值
 */

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'xiaoyuoshu',
            database: 'S_C',
            port: 3306
        });
    }

    /**
     * 获取所有学院信息
     * @param data 请求数据
     * @param res 返回句柄
     */
    querySc(data,res){
        console.log(data);
        var sql = 'select * from School';
        var params = [];
        this.connection.query(sql,params,function (err,result) {
            if(err){
                console.log('error');
            } else {
                console.log(result);
                res.send(result);
            }
        });
    }

    /**
     * 获取某一学院的所有专业数据
     * @param data 请求数据
     * @param res 返回句柄
     */
    querySc_Major(data,res){
        var sql = 'select * from Major where SCno = ?';
        var params = [data.SCno];
        this.connection.query(sql,params,function (err,result) {
            if(err){
                console.log('error');
            } else {
                console.log(result);
                res.send(result);
            }
        });
    }

    /**
     * 获取某一专业所有的老师
     * @param data 请求数据
     * @param res 返回句柄
     */
    queryMajor_Teacher(data,res){
        var sql = 'select * from Teacher where Mno = ?';
        var params = [data.Mno];
        this.connection.query(sql,params,function (err,result) {
            if(err){
                console.log('error');
            } else {
                res.send({
                    code:0,
                    msg:"",
                    count:result.length,
                    data:result
                });
            }
        });
    }

    /**
     * 获取所有的老师数据
     * @param data 请求数据
     * @param res 返回句柄
     */
    queryALLTeacher(data,res){
        var sql = 'select * from Teacher';
        var params = [];
        this.connection.query(sql,params,function (err,result) {
            if(err){
                console.log('error');
            } else {
                console.log(result);
                res.send(result);
            }
        });
    }

    /**
     * 获取已知教师号的老师数据
     * @param data 请求数据
     * @param res 返回句柄
     */
    queryTeacher(data,res){
        var sql = 'select * from Teacher where Tno = ?';
        var params = [data.Tno];
        console.log(data);
        this.connection.query(sql,params,function (err,result) {
            if(err){
                console.log('error');
            } else {
                if(data.hasOwnProperty('Tkey')){
                    console.log(data.Tkey);
                    console.log(result);
                    if(data.Tkey==result[0].Tkey){
                        res.send({
                            status:200,
                            success: true,
                            url:'/teacher/'+data.Tno
                        });
                    }else {
                        res.send({
                            status:200,
                            success: false,
                            url:''
                        });
                    }
                } else {
                    res.send(result[0]);
                }
            }
        });
    }

    /**
     * 获取某一课程所有的学生
     * @param data 请求数据
     * @param res 返回句柄
     */
    queryCourse_Student(data,res){
        var sql = 'select Score.Sno, Student.Sname, Score.Grade, Course.Cno, Course.Cname from Student,Score,Course where Student.Sno = Score.Sno and Score.Cno = Course.Cno and Score.Cno = ?';
        var params = [data.Cno];
        this.connection.query(sql,params,function (err,result) {
            if(err){
                console.log(err);
            } else {
                console.log(result);
                res.send({
                    code:0,
                    msg:"",
                    count:result.length,
                    data:result
                });
            }
        });
    }

    /**
     * 获取某一专业所有的学生
     * @param data 请求数据
     * @param res 返回句柄
     */
    queryMajor_Student(data,res){
        var sql = 'select * from Student where Mno = ?';
        var params = [data.Mno];
        this.connection.query(sql,params,function (err,result) {
            if(err){
                console.log('error');
            } else {
                res.send({
                    code:0,
                    msg:"",
                    count:result.length,
                    data:result
                });
            }
        });
    }

    /**
     * 获取已知学号的学生
     * @param data 请求数据
     * @param res 返回句柄
     */
    queryStudent(data,res){
        var sql = 'select * from Student where Sno = ?';
        var params = [data.Sno];
        this.connection.query(sql,params,function (err,result) {
            if(err){
                console.log('error');
            } else {
                if(data.hasOwnProperty('Skey')){
                    console.log(data.Skey);
                    console.log(result);
                    if(data.Skey==result[0].Skey){
                        res.send({
                            status:200,
                            success: true,
                            url:'/student/'+data.Sno
                        });
                    }else {
                        res.send({
                            status:200,
                            success: false,
                            url:''
                        });
                    }
                } else {
                    res.send(result[0]);
                }
            }
        });
    }

    /**
     * 获取已知学号的学生的所有课程（在成绩表中获得，要求还附带有课程名称、学分、任课老师
     * @param data 请求数据
     * @param res 返回句柄
     */
    queryStudent_Course(data,res){
        var sql = 'select Score.Sno, Score.Cno, Score.Grade, Course.Cname, Course.Ccredit, Teacher.Tname from Course,Score,Teacher where Score.Cno = Course.Cno and Course.Tno = Teacher.Tno and Score.Sno = ?';
        var params = [data.Sno];
        this.connection.query(sql,params,function (err,result) {
            if(err){
                console.log(err);
            } else {
                res.send({
                    code:0,
                    msg:"",
                    count:result.length,
                    data:result
                });
            }
        });
    }

    /**
     * 获取已知教师号的教师任课的所有课程
     * @param data 请求数据
     * @param res 返回句柄
     */
    queryTeacher_Course(data,res){
        var sql = 'select * from Course where Tno = ?';
        var params = [data.Tno];
        this.connection.query(sql,params,function (err,result) {
            if(err){
                console.log('error');
            } else {
                console.log(result);
                res.send(result);
            }
        });
    }


    /**
     * 获取所有课程数据，要求先修课程和任课老师除了课号和教师号外还附带两者的名称
     * @param data 请求数据
     * @param res 返回句柄
     */
    queryALLCourse(data,res){
        var ret =  {
            code:0,
            msg:"",
            count:0,
            data:[]
        }
        var that = this;
        var sql = 'select Teacher.Tname,Csx.Cno,Csx.Cpno,Csx.Cname,Csx.Ccredit,Csx.Tno,Csy.Cname as Cpname from Teacher,Course Csx,Course Csy where Csx.Cpno = Csy.Cno and Csx.Tno = Teacher.Tno';
        var params = [];
        that.connection.query(sql,params,function (err,result) {
            if(err){
                console.log('error');
            } else {
                for(var i = 0;i < result.length;i++){
                    ret.count++;
                    ret.data.push(result[i]);
                }
                sql = 'select Teacher.Tname,Cno,Cpno,Cname,Ccredit,Cpno,Course.Tno,Course.Cpno as Cpname from Teacher,Course where Cpno is null and Teacher.Tno = Course.Tno';
                that.connection.query(sql,params,function (err,result) {
                    if(err){
                        console.log('error');
                    } else {
                        for(var i = 0;i < result.length;i++){
                            ret.count++;
                            ret.data.push(result[i]);
                        }
                        res.send(ret);
                    }
                });
            }
        });
    }

    /**
     * 修改已知教师号的教师的数据，除教师号外均有可能更改
     * @param data 请求数据
     * @param res 返回句柄
     */
    updateTeacher(data,res){
        var sql = 'update Teacher set Tname = ?,Tsex = ?,Ttitle = ?,Mno =  ?,Tdirection = ?,Tkey = ? where Tno = ?';
        var params = [data.Tname,data.Tsex,data.Ttitle,data.Mno,data.Tdirection,data.Tkey,data.Tno];
        this.connection.query(sql,params,function (err,result) {
            if(err){
                console.log('error');
            } else {
                console.log(result);
                res.send('1');
            }
        });
    }

    /**
     * 修改已知学号的学生的数据，除学号外均有可能更改
     * @param data 请求数据
     * @param res 返回句柄
     */
    updateStudent(data,res){
        var sql = `update Student set Sname = ?,SSex = ?,Sclass = ?,Mno = ?,Skey = ? where Sno = ?`;
        var params = [data.Sname,data.SSex,data.Sclass,data.Mno,data.Skey,data.Sno];
        this.connection.query(sql,params,function (err,result) {
            if(err){
                console.log('error');
            } else {
                console.log(result);
                res.send('1');
            }
        });
    }

    /**
     * 教师根据课程号和学号登记学生成绩
     * @param data 请求数据
     * @param res 返回句柄
     */
    updateScore(data,res){
        var sql = 'update Score set Grade = ? where Cno = ? and Sno = ?';
        var params = [data.Grade,data.Cno,data.Sno];
        this.connection.query(sql,params,function (err,result) {
            if(err){
                console.log('error');
            } else {
                console.log(result);
                res.send(result);
            }
        });
    }

    /**
     * 修改已知课程号的课程的数据，除课程号外均有可能更改
     * @param data 请求数据
     * @param res 返回句柄
     */
    updateCourse(data,res){
        var sql = 'update Course set Cpno = ?,Cname = ?,Ccredit = ?,Tno = ? where Cno = ?';
        var params = [data.Cpno,data.Cname,data.Ccredit,data.Tno,data.Cno];
        this.connection.query(sql,params,function (err,result) {
            if(err){
                console.log('error');
            } else {
                console.log(result);
                res.send(result);
            }
        });
    }

    /**
     * 新增学生数据，所有信息均包含在data中
     * @param data 请求数据
     * @param res 返回句柄
     */
    insertStudent(data,res){
        var sql = 'insert into Student values(?,?,?,?,?,?)';
        var params = [data.Sno,data.Sname,data.SSex,data.Sclass,data.Mno,data.Skey];
        this.connection.query(sql,params,function (err,result) {
            if(err){
                console.log('error');
            } else {
                console.log(result);
                res.send(result);
            }
        });
    }

    /**
     * 新增教师数据，所有信息均包含在data中
     * @param data 请求数据
     * @param res 返回句柄
     */
    insertTeacher(data,res){
        var sql = 'insert into Teacher values(?,?,?,?,?,?,?)';
        var params = [data.Tno,data.Tname,data.Tsex,data.Ttitle,data.Mno,data.Tdirection,data.Tkey];
        this.connection.query(sql,params,function (err,result) {
            if(err){
                console.log('error');
            } else {
                console.log(result);
                res.send(result);
            }
        });
    }

    /**
     * 新增课程数据，所有信息均包含在data中
     * @param data 请求数据
     * @param res 返回句柄
     */
    insertCourse(data,res){
        var sql = 'insert into Course values(?,?,?,?,?)';
        var params = [data.Cno,data.Cpno,data.Cname,data.Ccredit,data.Tno];
        this.connection.query(sql,params,function (err,result) {
            if(err){
                console.log(err);
            } else {
                console.log(result);
                res.send(result);
            }
        });
    }

    /**
     * 根据学号查询学生可以选的课程的数据（满足先修课要求）
     * @param data 请求数据
     * @param res 返回句柄
     */
    querySelectableCourse(data,res){
        var that = this;
        var ret = [];
        var sql = 'select Score.Sno, Score.Cno, Score.Grade, Course.Cname, Course.Ccredit, Teacher.Tname from Course,Score,Teacher where Score.Cno = Course.Cno and Course.Tno = Teacher.Tno and Score.Sno = ?';
        var params = [data.Sno];
        that.connection.query(sql,params,function (err,result_pre) {
            if(err){
                console.log(err);
            } else {
                sql = 'select * from Course,Teacher where Teacher.Tno  = Course.Tno and Cpno is null';
                params = [data.Sno];
                that.connection.query(sql,params,function (err,result) {
                    if(err){
                        console.log(err);
                    } else {
                        for(var i in result) {
                            var index = 1;
                            for (var j in result_pre) {
                                if (result[i].Cno == result_pre[j].Cno)
                                    index = 0;
                            }
                            if(index==1){
                                ret.push(result[i]);
                            }
                        }
                        console.log('############\n');
                        console.log(ret);
                        console.log('############\n');
                        sql = 'select * from Course,Teacher where Teacher.Tno  = Course.Tno and Cpno is not null';
                        params = [data.Sno];
                        that.connection.query(sql,params,function (err,result_nl) {
                            if(err){
                                console.log(err);
                            } else {
                                for(var i in result_nl) {
                                    var index = 1;
                                    for (var j in result_pre) {
                                        if (result_nl[i].Cno == result_pre[j].Cno)
                                            index = 0;
                                    }
                                    if(index==1){
                                        for (var j in result_pre) {
                                            if (result_nl[i].Cpno == result_pre[j].Cno)
                                                ret.push(result_nl[i]);
                                        }
                                    }
                                }
                                console.log('$$$$$$$$\n');
                                console.log(ret);
                                console.log('$$$$$$$$\n');
                                res.send({
                                    code:0,
                                    msg:"",
                                    count:ret.length,
                                    data:ret
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    /**
     * 学生根据课程号选课（即加入成绩表
     * @param data 请求数据
     * @param res 返回句柄
     */
    selectCourse(data,res){
        var sql = 'insert into Score values(?,?,NULL)';
        var params = [data.Cno,data.Sno];
        console.log(params);
        this.connection.query(sql,params,function (err,result) {
            if(err){
                console.log(err);
            } else {
                console.log(result);
                res.send(result);
            }
        });
    }
}
module.exports = Database;