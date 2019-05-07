layui.use(['form','layer'], function(){
    var form = layui.form;
    var layer = layui.layer;
    form.on('submit(formDemo)', function(data){
        $.ajax({
            url: '/api/login_submit',
            data: {
                account:data.field.account,
                password:data.field.password,
                submit_type:data.field.submit_type
            },
            type: 'post',
            dataType: 'json',
            success: function (data) {
                console.log("login success!");
                console.log(data);
                if(data.success==true) window.location.href = data.url;
                else {
                    layer.open({
                        type: 1
                        ,offset: 'auto'
                        ,id: 'layerDemo'+'auto'
                        ,content: '<div style="padding: 50px 50px;">'+ '<P>登录失败！</p><p>请检查用户名和密码是否正确！</p><p>或检查登录类型是否正确。</p>' +'</div>'
                        ,btn: '我知道了'
                        ,btnAlign: 'c'
                        ,shade: 0
                        ,yes: function(){
                            layer.closeAll();
                        }
                    });
                }
            }
        });

        return false;
    });
});