//因为在每次拼接地址的时候，我们都需要重新连接，所以我们写一个脚本来补全前边重复的部分
$.ajaxPrefilter(function(options) {
    // options.url = 'http://ajax.frontend.itheima.net' + options.url
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
        //因为后边有很多次都要用到权限，所以我们再次进行拼接来节省
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //我们在每次访问有权限的接口时都需要用到complete，所以我们用AJAXprefilter来先拼接字段
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //如果失败我们需要把token值给清空
            localStorage.removeItem('token');
            //跳回登录页面
            location.href = '/login.html'

        }
    }
})