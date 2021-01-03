$(function() {
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samepwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能一样'
            }
        },
        repwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })

    //重置密码发起AJAX请求




    $('#repwd').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg('更新密码失败')
                layer.msg('更新密码成功')
                $('.layui-form')[0].reset()
                localStorage.removeItem('token')
                window.parent.location.href = '/login.html'
            }
        });
    })


})