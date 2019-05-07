$.ajax({
    url: '/api/get_Sc',
    data: {
    },
    type: 'get',
    dataType: 'json',
    success: function (data) {
        var div = $('#nav-bar');
        $.ajax({
            url: '/api/get_Teacher_Course',
            data: {
                Tno:$('#Tno').text()
            },
            type: 'get',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                for(var i in data){
                    $('#Course').append('<dd><a id="'+data[i].Cno+'">'+data[i].Cname+'</a></dd>');
                }
                div.append('<li id="perInfo" class="layui-nav-item"><a>个人信息管理</a></li>');
            }
        });
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
    form.on('submit(changePW)', function(data){
        console.log(data.field)
        var Tno = data.field.Tno;
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
                layer.msg('修改成功');
            }
        });
        return false;
    });

    table.on('edit(test)', function(obj){
        var data = obj.data //得到所在行所有键值
        if(data.Grade>=0&&data.Grade<=100){
            $.ajax({
                url: '/api/updateScore',
                data: data,
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    $('dl.layui-nav-child dd #' + $('#Cno_tag').text()).click();
                    layer.msg('修改成功');
                }
            });

        }else {
            layer.msg('成绩应该在0~100间');
        }
    });
    $('dl.layui-nav-child dd').on('click',function () {
        var e = window.event;
        $('#Cno_tag').text(e.target.id);
        $('#info_content').hide();
        $('#main_content').show();
        table.render({
            elem: '#test'
            , url: '/api/get_Course_Student/' + $('#Cno_tag').text()
            , cellMinWidth: 100
            , cols: [[
                {field: 'Sno', title: '学号', fixed: 'left', unresize: true, sort: true}
                , {field: 'Sname', title: '姓名'}
                , {field: 'Cno', title: '课程号'}
                , {field: 'Cname', title: '课程名'}
                , {field: 'Grade', edit: 'text', title: '分数'}
            ]]
            , page: true
        });
    })
    $('#perInfo').on('click',function () {
        $('#main_content').hide();
        $('#info_content').show();
        $.ajax({
            url: '/api/get_Teacher',
            data: {
                Tno:$('#Tno').text()
            },
            type: 'get',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if($("#TinfoFrom").length <= 0) {
                    $('#info_content .layui-tab').append('<form id="TinfoFrom" class="layui-form layui-form-pane" lay-filter="f" action="" style="margin-top: 50px;padding-left: 5px;padding-right: 5px">\n' +
                        '                <div class="layui-form-item">\n' +
                        '                    <label class="layui-form-label">教师号</label>\n' +
                        '                    <div class="layui-input-block">\n' +
                        '                        <input type="text" value="' + data.Tno + '" name="Tno" required  lay-verify="required" autocomplete="off" class="layui-input" readonly="readonly">\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '                <div class="layui-form-item">\n' +
                        '                    <label class="layui-form-label">姓名</label>\n' +
                        '                    <div class="layui-input-block">\n' +
                        '                        <input type="text" value="' + data.Tname + '" name="Tname" required  lay-verify="required" autocomplete="off" class="layui-input" readonly="readonly">\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '                <div class="layui-form-item">\n' +
                        '                    <label class="layui-form-label">性别</label>\n' +
                        '                    <div class="layui-input-block">\n' +
                        '                        <input type="text" value="' + data.Tsex + '" name="Tsex" required  lay-verify="required" autocomplete="off" class="layui-input" readonly="readonly">\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '                <div class="layui-form-item">\n' +
                        '                    <label class="layui-form-label">职称</label>\n' +
                        '                    <div class="layui-input-block">\n' +
                        '                        <input type="text" value="' + data.Ttitle + '" name="Ttitle" required  lay-verify="required" autocomplete="off" class="layui-input" readonly="readonly">\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '                <div class="layui-form-item">\n' +
                        '                    <label class="layui-form-label">专业号</label>\n' +
                        '                    <div class="layui-input-block">\n' +
                        '                        <input type="text" value="' + data.Mno + '" name="Mno" required  lay-verify="required" autocomplete="off" class="layui-input" readonly="readonly">\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '                <div class="layui-form-item">\n' +
                        '                    <label class="layui-form-label">研究方向</label>\n' +
                        '                    <div class="layui-input-block">\n' +
                        '                        <input type="text" value="' + data.Tdirection + '" name="Tdirection" required  lay-verify="required" autocomplete="off" class="layui-input" readonly="readonly">\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '                <div class="layui-form-item">\n' +
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
                        '                        <button class="layui-btn" lay-submit lay-filter="changePW">修改密码</button>\n' +
                        '                        <button type="reset" class="layui-btn layui-btn-primary">重置</button>\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '            </form>');
                }
            }
        });
    })
});