$(function() {
    $("#login_page .go_regist").on('click', function() {
        $("#login_page").hide()
        $("#regist_page").show()
    })
    $("#regist_page .go_login").on('click', function() {
        $("#regist_page").hide()
        $("#login_page").show()
    })
    $('#regist_page').submit(function(e) {
        e.preventDefault();
        $(this).serialize();
    })
    $('#login_page').submit(function(e) {
        e.preventDefault();
        $(this).serialize()
    })
    var form = layui.form
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('#regist_page [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    var layer = layui.layer
    $('#regist_page').submit(function(e) {
        e.preventDefault();
        // var data = {
        //     username: $('#regist_page [name=username]').val(),
        //     password: $('#regist_page [name=password]').val()
        // }
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            // data,
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,请登录')
                $('.go_login').click()

            }
        })
    })
    $('#login_page').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('登陆成功')
                localStorage.setItem('token', res.token)
                location.href = ('/index.html')
            }
        });
    })
})