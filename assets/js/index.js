$(function() {
    getUserInfo()
    var layer = layui.layer;
    $('#loginout').on('click', function() {
        // console.log(11);
        //首先清除请求头
        layer.confirm('确认退出登录？', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem("token")
            location.href = '/login.html'
                // layer.close(index)
        })

    })
})

function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) return layer.msg(res.message)

            renderAvatar(res.data)
        },
        // complete: function(res) {
        //     // console.log('调用了complete函数');
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //如果失败我们需要把token值给清空
        //         localStorage.removeItem('token');
        //         //跳回登录页面
        //         location.href = '/login.html'

        //     }
        // }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username;
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + user.username)
        //如果用户自己有头像就渲染自己的头像没有就渲染首字母大写头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show()
    }
}