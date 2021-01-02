//因为在每次拼接地址的时候，我们都需要重新连接，所以我们写一个脚本来补全前边重复的部分
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})