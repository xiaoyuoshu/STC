$.ajax({
    url: '/api/get_Sc',
    data: {
    },
    type: 'get',
    dataType: 'json',
    success: function (data) {
        var div = $('#nav-bar');
        for(var i in data){
            div.append('<li id='+data[i].SCno+' class="layui-nav-item layui-nav-itemed">\n' +
                '                    <a class="javascript:;" href="javascript:;">'+data[i].SCname+'<span class="layui-nav-more"></span></a>\n' +
                '                    <dl class="layui-nav-child">\n' +
                '                    </dl>\n' +
                '                </li>');
        }
        for(var i in data){
            $.ajax({
                url: '/api/get_Sc_Major',
                data: {
                    SCno:data[i].SCno
                },
                type: 'get',
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    for(var i in data){
                        $('#'+data[i].SCno+' dl.layui-nav-child').append('<dd><a id="'+data[i].Mno+'">'+data[i].Mname+'</a></dd>');
                    }
                }
            });
        }
        div.append('<li id="CourseInfo" class="layui-nav-item"><a>课程信息</a></li>');
    }
});

layui.use(['element','table','layer'], function(){
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
    var table = layui.table;
    var layer = layui.layer;
    var form = layui.form;
    //监听导航点击
    element.on('nav(demo)', function(elem){
        //console.log(elem)
        layer.msg(elem.text());
    });
    //table
    form.on('submit(TForm)', function(data){
        console.log(data.field)
        var Tno = $('div.layui-layer-title').text();
        var Tname = data.field.Tname;
        var Tsex = data.field.Tsex;
        var Ttitle = data.field.Ttitle;
        var Mno = data.field.Mno;
        var Tdirection = data.field.Tdirection;
        var Tkey = data.field.Tkey;
        $.ajax({
            url: '/api/updateTeacher',
            data: {
                Tno:Tno,
                Tname:Tname,
                Tsex:Tsex,
                Ttitle:Ttitle,
                Mno:Mno,
                Tdirection:Tdirection,
                Tkey:Tkey
            },
            type: 'post',
            dataType: 'json',
            success: function (data) {
                layer.closeAll();
            }
        });
    });
    form.on('submit(SForm)', function(data){
        console.log(data.field)
        var Sno = $('div.layui-layer-title').text();
        var Sname = data.field.Sname;
        var SSex = data.field.SSex;
        var Sclass = data.field.Sclass;
        var Mno = data.field.Mno;
        var Skey = data.field.Skey;
        $.ajax({
            url: '/api/updateStudent',
            data: {
                Sno:Sno,
                Sname:Sname,
                SSex:SSex,
                Sclass:Sclass,
                Mno:Mno,
                Skey:Skey
            },
            type: 'post',
            dataType: 'json',
            success: function (data) {
                layer.closeAll();
            }
        });
    });
    form.on('submit(CForm)', function(data){
        console.log(data.field)
        var Cno = $('div.layui-layer-title').text();
        var Cname = data.field.Cname;
        var Cpno = data.field.Cpno;
        var Ccredit = data.field.Ccredit;
        var Tno = data.field.Tno;
        $.ajax({
            url: '/api/updateCourse',
            data: {
                Cno:Cno,
                Cname:Cname,
                Cpno:Cpno,
                Ccredit:Ccredit,
                Tno:Tno
            },
            type: 'post',
            dataType: 'json',
            success: function (data) {
                layer.closeAll();
            }
        });
    });
    form.on('submit(NTForm)', function(data){
        console.log(data.field)
        var Tno = data.field.Tno;
        var Tname = data.field.Tname;
        var Tsex = data.field.Tsex;
        var Ttitle = data.field.Ttitle;
        var Mno = data.field.Mno;
        var Tdirection = data.field.Tdirection;
        var Tkey = data.field.Tkey;
        $.ajax({
            url: '/api/insertTeacher',
            data: {
                Tno:Tno,
                Tname:Tname,
                Tsex:Tsex,
                Ttitle:Ttitle,
                Mno:Mno,
                Tdirection:Tdirection,
                Tkey:Tkey
            },
            type: 'post',
            dataType: 'json',
            success: function (data) {
                layer.closeAll();
            }
        });
    });
    form.on('submit(NSForm)', function(data){
        console.log(data.field)
        var Sno = data.field.Sno;
        var Sname = data.field.Sname;
        var SSex = data.field.SSex;
        var Sclass = data.field.Sclass;
        var Mno = data.field.Mno;
        var Skey = data.field.Skey;
        $.ajax({
            url: '/api/insertStudent',
            data: {
                Sno:Sno,
                Sname:Sname,
                SSex:SSex,
                Sclass:Sclass,
                Mno:Mno,
                Skey:Skey
            },
            type: 'post',
            dataType: 'json',
            success: function (data) {
                layer.closeAll();
            }
        });
    });
    form.on('submit(NCForm)', function(data){
        var Cno = data.field.Cno;
        var Cname = data.field.Cname;
        var Cpno = data.field.Cpno;
        var Ccredit = data.field.Ccredit;
        var Tno = data.field.Tno;
        $.ajax({
            url: '/api/insertCourse',
            data: {
                Cno:Cno,
                Cname:Cname,
                Cpno:Cpno,
                Ccredit:Ccredit,
                Tno:Tno
            },
            type: 'post',
            dataType: 'json',
            success: function (data) {
                layer.closeAll();
            }
        });
        return false;
    });
    table.on('rowDouble(test)', function(obj){
        var data = obj.data;
        if($('#TorS').text()=="T") {
            layer.open({
                type: 1
                ,
                title: data.Tno
                ,
                offset: 'auto'
                ,
                id: 'layerDemo' + 0 //防止重复弹出
                ,
                content: '<form class="layui-form layui-form-pane" lay-filter="f" action="" style="margin-top: 50px;padding-left: 5px;padding-right: 5px">\n' +
                '                <div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">姓名</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" value="' + data.Tname + '" name="Tname" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">性别</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" value="' + data.Tsex + '" name="Tsex" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '\t\t\t\t<div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">职称</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" value="' + data.Ttitle + '" name="Ttitle" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '\t\t\t\t<div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">专业号</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" value="' + data.Mno + '" name="Mno" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '\t\t\t\t<div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">研究方向</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" value="' + data.Tdirection + '" name="Tdirection" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '\t\t\t\t<div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">登录密码</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" value="' + data.Tkey + '" name="Tkey" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="layui-form-item">\n' +
                '                    <script>\n' +
                '                        $(\'#existedApp\').click(function () {\n' +
                '                            alert(\'Hello!\');\n' +
                '                        });\n' +
                '                    </script>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <button class="layui-btn" lay-submit lay-filter="TForm">提交</button>\n' +
                '                        <button type="reset" class="layui-btn layui-btn-primary">重置</button>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </form>'
                ,
                btn: '关闭全部'
                ,
                btnAlign: 'c' //按钮居中
                ,
                shade: 0 //不显示遮罩
                ,
                yes: function () {
                    layer.closeAll();
                }
            });
        } else {
            layer.open({
                type: 1
                ,
                title: data.Sno
                ,
                offset: 'auto'
                ,
                id: 'layerDemo' + 0 //防止重复弹出
                ,
                content: '<form class="layui-form layui-form-pane" lay-filter="f" action="" style="margin-top: 50px;padding-left: 5px;padding-right: 5px">\n' +
                '                <div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">姓名</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" value="' + data.Sname + '" name="Sname" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">性别</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" value="' + data.SSex + '" name="SSex" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '\t\t\t\t<div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">班级</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" value="' + data.Sclass + '" name="Sclass" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '\t\t\t\t<div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">专业号</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" value="' + data.Mno + '" name="Mno" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '\t\t\t\t<div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">登录密码</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" value="' + data.Skey + '" name="Skey" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="layui-form-item">\n' +
                '                    <script>\n' +
                '                        $(\'#existedApp\').click(function () {\n' +
                '                            alert(\'Hello!\');\n' +
                '                        });\n' +
                '                    </script>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <button class="layui-btn" lay-submit lay-filter="SForm">提交</button>\n' +
                '                        <button type="reset" class="layui-btn layui-btn-primary">重置</button>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </form>'
                ,
                btn: '关闭全部'
                ,
                btnAlign: 'c' //按钮居中
                ,
                shade: 0 //不显示遮罩
                ,
                yes: function () {
                    layer.closeAll();
                }
            });
        }
        //标注选中样式
        obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
    });
    table.on('rowDouble(course)', function(obj){
        var data = obj.data;
        layer.open({
            type: 1
            ,
            title: data.Cno
            ,
            offset: 'auto'
            ,
            id: 'layerDemo' + 0 //防止重复弹出
            ,
            content: '<form class="layui-form layui-form-pane" lay-filter="f" action="" style="margin-top: 50px;padding-left: 5px;padding-right: 5px">\n' +
            '                <div class="layui-form-item">\n' +
            '                    <label class="layui-form-label">课程名</label>\n' +
            '                    <div class="layui-input-block">\n' +
            '                        <input type="text" value="' + data.Cname + '" name="Cname" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div class="layui-form-item">\n' +
            '                    <label class="layui-form-label">先修课程号</label>\n' +
            '                    <div class="layui-input-block">\n' +
            '                        <input type="text" value="' + data.Cpno + '" name="Cpno" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '\t\t\t\t<div class="layui-form-item">\n' +
            '                    <label class="layui-form-label">学分</label>\n' +
            '                    <div class="layui-input-block">\n' +
            '                        <input type="text" value="' + data.Ccredit + '" name="Ccredit" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '\t\t\t\t<div class="layui-form-item">\n' +
            '                    <label class="layui-form-label">任课教师号</label>\n' +
            '                    <div class="layui-input-block">\n' +
            '                        <input type="text" value="' + data.Tno + '" name="Tno" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div class="layui-form-item">\n' +
            '                    <script>\n' +
            '                        $(\'#existedApp\').click(function () {\n' +
            '                            alert(\'Hello!\');\n' +
            '                        });\n' +
            '                    </script>\n' +
            '                    <div class="layui-input-block">\n' +
            '                        <button class="layui-btn" lay-submit lay-filter="CForm">提交</button>\n' +
            '                        <button type="reset" class="layui-btn layui-btn-primary">重置</button>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </form>'
            ,
            btn: '关闭全部'
            ,
            btnAlign: 'c' //按钮居中
            ,
            shade: 0 //不显示遮罩
            ,
            yes: function () {
                layer.closeAll();
            }
        });
        //标注选中样式
        obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
    });
    $('#T').on('click',function () {
        $('#TorS').text("T");
        table.render({
            elem: '#test'
            ,url:'/api/get_Major_Teacher/'+$('#Mno_tag').text()
            ,cellMinWidth: 100
            ,cols: [[
                {field:'Tno', title:'教师号',fixed: 'left', unresize: true, sort: true}
                ,{field:'Tname', title:'姓名'}
                ,{field:'Tsex', title:'性别'}
                ,{field:'Ttitle', title:'职称'}
                ,{field:'Mno', title:'专业号'}
                ,{field:'Tdirection', title:'研究方向'}
                ,{field:'Tkey', title:'登录密码'}
            ]]
            ,page: true
        });
    });
    $('#S').on('click',function () {
        $('#TorS').text("S");
        table.render({
            elem: '#test'
            ,url:'/api/get_Major_Student/'+$('#Mno_tag').text()
            ,cellMinWidth: 100
            ,cols: [[
                {field:'Sno', title:'学号',fixed: 'left', unresize: true, sort: true}
                ,{field:'Sname', title:'姓名'}
                ,{field:'SSex', title:'性别'}
                ,{field:'Sclass', title:'班级'}
                ,{field:'Mno', title:'专业号'}
                ,{field:'Skey', title:'登录密码'}
            ]]
            ,page: true
        });
    });
    $('#new').on('click',function () {
        if($('#TorS').text()=="S") {
            layer.open({
                type: 1
                ,
                title: '添加学生信息'
                ,
                offset: 'auto'
                ,
                id: 'layerDemo' + 0 //防止重复弹出
                ,
                content: '<form class="layui-form layui-form-pane" lay-filter="f" action="" style="margin-top: 50px;padding-left: 5px;padding-right: 5px">\n' +
                '                <div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">学号</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" name="Sno" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">姓名</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" name="Sname" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">性别</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" name="SSex" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '\t\t\t\t<div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">班级</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" name="Sclass" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '\t\t\t\t<div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">专业号</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" name="Mno" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '\t\t\t\t<div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">登录密码</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" name="Skey" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="layui-form-item">\n' +
                '                    <script>\n' +
                '                        $(\'#existedApp\').click(function () {\n' +
                '                            alert(\'Hello!\');\n' +
                '                        });\n' +
                '                    </script>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <button class="layui-btn" lay-submit lay-filter="NSForm">提交</button>\n' +
                '                        <button type="reset" class="layui-btn layui-btn-primary">重置</button>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </form>'
                ,
                btn: '关闭全部'
                ,
                btnAlign: 'c' //按钮居中
                ,
                shade: 0 //不显示遮罩
                ,
                yes: function () {
                    layer.closeAll();
                }
            });
        }else {
            layer.open({
                type: 1
                ,
                title: '添加教师信息'
                ,
                offset: 'auto'
                ,
                id: 'layerDemo' + 0 //防止重复弹出
                ,
                content: '<form class="layui-form layui-form-pane" lay-filter="f" action="" style="margin-top: 50px;padding-left: 5px;padding-right: 5px">\n' +
                '                <div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">教师号</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" name="Tno" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">姓名</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" name="Tname" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">性别</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" name="Tsex" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '\t\t\t\t<div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">职称</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" name="Ttitle" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '\t\t\t\t<div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">专业号</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" name="Mno" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '\t\t\t\t<div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">研究方向</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" name="Tdirection" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '\t\t\t\t<div class="layui-form-item">\n' +
                '                    <label class="layui-form-label">登录密码</label>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <input type="text" name="Tkey" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="layui-form-item">\n' +
                '                    <script>\n' +
                '                        $(\'#existedApp\').click(function () {\n' +
                '                            alert(\'Hello!\');\n' +
                '                        });\n' +
                '                    </script>\n' +
                '                    <div class="layui-input-block">\n' +
                '                        <button class="layui-btn" lay-submit lay-filter="NTForm">提交</button>\n' +
                '                        <button type="reset" class="layui-btn layui-btn-primary">重置</button>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </form>'
                ,
                btn: '关闭全部'
                ,
                btnAlign: 'c' //按钮居中
                ,
                shade: 0 //不显示遮罩
                ,
                yes: function () {
                    layer.closeAll();
                }
            });
        }
    })
    $('#newC').on('click',function () {
        layer.open({
            type: 1
            ,
            title: '新增课程信息'
            ,
            offset: 'auto'
            ,
            id: 'layerDemo' + 0 //防止重复弹出
            ,
            content: '<form class="layui-form layui-form-pane" lay-filter="f" action="" style="margin-top: 50px;padding-left: 5px;padding-right: 5px">\n' +
            '                <div class="layui-form-item">\n' +
            '                    <label class="layui-form-label">课程号</label>\n' +
            '                    <div class="layui-input-block">\n' +
            '                        <input type="text" name="Cno" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div class="layui-form-item">\n' +
            '                    <label class="layui-form-label">课程名</label>\n' +
            '                    <div class="layui-input-block">\n' +
            '                        <input type="text" name="Cname" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div class="layui-form-item">\n' +
            '                    <label class="layui-form-label">先修课程号</label>\n' +
            '                    <div class="layui-input-block">\n' +
            '                        <input type="text" name="Cpno" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '\t\t\t\t<div class="layui-form-item">\n' +
            '                    <label class="layui-form-label">学分</label>\n' +
            '                    <div class="layui-input-block">\n' +
            '                        <input type="text" name="Ccredit" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '\t\t\t\t<div class="layui-form-item">\n' +
            '                    <label class="layui-form-label">任课教师号</label>\n' +
            '                    <div class="layui-input-block">\n' +
            '                        <input type="text" name="Tno" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div class="layui-form-item">\n' +
            '                    <script>\n' +
            '                        $(\'#existedApp\').click(function () {\n' +
            '                            alert(\'Hello!\');\n' +
            '                        });\n' +
            '                    </script>\n' +
            '                    <div class="layui-input-block">\n' +
            '                        <button class="layui-btn" lay-submit lay-filter="NCForm">提交</button>\n' +
            '                        <button type="reset" class="layui-btn layui-btn-primary">重置</button>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </form>'
            ,
            btn: '关闭全部'
            ,
            btnAlign: 'c' //按钮居中
            ,
            shade: 0 //不显示遮罩
            ,
            yes: function () {
                layer.closeAll();
            }
        });
    })
    $('dl.layui-nav-child dd').on('click',function () {
        var e = window.event;
        $('#Mno_tag').text(e.target.id);
        $('#course_content').hide();
        $('#main_content').show();

        if($('#TorS').text()=="T") {
            table.render({
                elem: '#test'
                , url: '/api/get_Major_Teacher/' + $('#Mno_tag').text()
                , cellMinWidth: 100
                , cols: [[
                    {field: 'Tno', title: '教师号', fixed: 'left', unresize: true, sort: true}
                    , {field: 'Tname', title: '姓名'}
                    , {field: 'Tsex', title: '性别'}
                    , {field: 'Ttitle', title: '职称'}
                    , {field: 'Mno', title: '专业号'}
                    , {field: 'Tdirection', title: '研究方向'}
                    , {field: 'Tkey', title: '登录密码'}
                ]]
                , page: true
            });
        }else {
            table.render({
                elem: '#test'
                ,url:'/api/get_Major_Student/'+$('#Mno_tag').text()
                ,cellMinWidth: 100
                ,cols: [[
                    {field:'Sno', title:'学号',fixed: 'left', unresize: true, sort: true}
                    ,{field:'Sname', title:'姓名'}
                    ,{field:'SSex', title:'性别'}
                    ,{field:'Sclass', title:'班级'}
                    ,{field:'Mno', title:'专业号'}
                    ,{field:'Skey', title:'登录密码'}
                ]]
                ,page: true
            });
        }
    })
    $('#CourseInfo').on('click',function () {
        $('#main_content').hide();
        $('#course_content').show();
        table.render({
            elem: '#course'
            ,url:'/api/queryALLCourse/'
            ,cellMinWidth: 100
            ,cols: [[
                {field:'Cno', title:'课程号',fixed: 'left', unresize: true, sort: true}
                ,{field:'Cname', title:'课程名'}
                ,{field:'Cpno', title:'先修课程号'}
                ,{field:'Cpname', title:'先修课程名'}
                ,{field:'Ccredit', title:'学分'}
                ,{field:'Tno', title:'任课教师号'}
                ,{field:'Tname', title:'任课教师姓名'}
            ]]
            ,page: true
        });
    })
});