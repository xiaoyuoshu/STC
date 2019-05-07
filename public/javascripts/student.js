
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
        $.ajax({
            url: '/api/updateStudent',
            data: data.field,
            type: 'post',
            dataType: 'json',
            success: function (data) {
                layer.closeAll();
                layer.msg('修改成功');
            }
        });
        return false;
    });
    table.on('rowDouble(ChoC)', function(obj){
        var data = obj.data;
        layer.open({
            type: 1
            ,
            title: '确认信息'
            ,
            offset: 'auto'
            ,
            id: 'layerDemo' + 0 //防止重复弹出
            ,
            content: '<a style="padding-left: 10px">确认选课：'+data.Cname+'？</a>'
            ,
            btn: ['确认', '取消']
            ,
            btnAlign: 'c' //按钮居中
            ,
            shade: 0 //不显示遮罩
            ,yes: function(){
                $.ajax({
                    url: '/api/selectCourse',
                    data: {
                        Cno:data.Cno,
                        Sno:$('#Sno').text()
                    },
                    type: 'post',
                    dataType: 'json',
                    success: function (data) {
                        layer.closeAll();
                        layer.msg('选课成功');
                        $('#CourseChoose').click();
                    }
                });
            }
            ,btn2: function(){
                layer.closeAll();
            }
        });
        //标注选中样式
        obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
    });
    $('#CourseInfo').on('click',function (){
        $('#ChoC_content').hide();
        $('#PInfo_content').hide();
        $('#CInfo_content').show();
        table.render({
            elem: '#CInfo'
            , url: '/api/get_Student_Course/' + $('#Sno').text()
            , cellMinWidth: 100
            , cols: [[
                {field: 'Sno', title: '学号', fixed: 'left', unresize: true, sort: true}
                , {field: 'Cno', title: '课程号'}
                , {field: 'Cname', title: '课程名'}
                , {field: 'Tname', title: '任课教师'}
                , {field: 'Ccredit', title: '学分'}
                , {field: 'Grade', title: '分数'}
            ]]
            , page: true
        });
    });

    $('#CourseChoose').on('click',function (){
        $('#CInfo_content').hide();
        $('#PInfo_content').hide();
        $('#ChoC_content').show();
        table.render({
            elem: '#ChoC'
            , url: '/api/get_SelectableCourse/' + $('#Sno').text()
            , cellMinWidth: 100
            , cols: [[
                {field: 'Cno', title: '课程号', fixed: 'left', unresize: true, sort: true}
                , {field: 'Cname', title: '课程名'}
                , {field: 'Ccredit', title: '学分'}
                , {field: 'Tname', title: '任课教师'}
            ]]
            , page: true
        });
    });
    $('#perInfo').on('click',function () {
        $('#CInfo_content').hide();
        $('#ChoC_content').hide();
        $('#PInfo_content').show();
        $.ajax({
            url: '/api/get_Student',
            data: {
                Sno:$('#Sno').text()
            },
            type: 'get',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if($("#SinfoFrom").length <= 0) {
                    $('#PInfo_content .layui-tab').append('<form id="SinfoFrom" class="layui-form layui-form-pane" lay-filter="f" action="" style="margin-top: 50px;padding-left: 5px;padding-right: 5px">\n' +
                        '                <div class="layui-form-item">\n' +
                        '                    <label class="layui-form-label">学号</label>\n' +
                        '                    <div class="layui-input-block">\n' +
                        '                        <input type="text" value="' + data.Sno + '" name="Sno" required  lay-verify="required" autocomplete="off" class="layui-input" readonly="readonly">\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '                <div class="layui-form-item">\n' +
                        '                    <label class="layui-form-label">姓名</label>\n' +
                        '                    <div class="layui-input-block">\n' +
                        '                        <input type="text" value="' + data.Sname + '" name="Sname" required  lay-verify="required" autocomplete="off" class="layui-input" readonly="readonly">\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '                <div class="layui-form-item">\n' +
                        '                    <label class="layui-form-label">性别</label>\n' +
                        '                    <div class="layui-input-block">\n' +
                        '                        <input type="text" value="' + data.SSex + '" name="SSex" required  lay-verify="required" autocomplete="off" class="layui-input" readonly="readonly">\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '                <div class="layui-form-item">\n' +
                        '                    <label class="layui-form-label">班级</label>\n' +
                        '                    <div class="layui-input-block">\n' +
                        '                        <input type="text" value="' + data.Sclass + '" name="Sclass" required  lay-verify="required" autocomplete="off" class="layui-input" readonly="readonly">\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '                <div class="layui-form-item">\n' +
                        '                    <label class="layui-form-label">专业号</label>\n' +
                        '                    <div class="layui-input-block">\n' +
                        '                        <input type="text" value="' + data.Mno + '" name="Mno" required  lay-verify="required" autocomplete="off" class="layui-input" readonly="readonly">\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '                <div class="layui-form-item">\n' +
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