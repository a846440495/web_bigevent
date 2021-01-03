$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.lenght > 6) {
                return '昵称的长度必须在1~6位之间'
            }
        }
    })
    initUserInfo()


    //初始化用户的信息
    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) return layer.msg('获取用户基本信息失败！')
                    // layer.msg('获取用户基本信息成功！')
                    // console.log(res);
                form.val('userinfo', res.data)
            }
        });
    }
    //重置按钮
    $('#btnReset').on('click', function(e) {
            e.preventDefault();
            initUserInfo()
        })
        //提交修改的按钮
    $('#userinfo').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('更新用户基本信息失败')
                layer.msg('更新用户基本信息成功')
                initUserInfo()
                window.parent.getUserInfo()
            }
        });
    })
})