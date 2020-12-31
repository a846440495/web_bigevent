$(function() {
    $(".login-box a").on('click', function() {
        $(".login-box").hide()
        $(".regist-box").show()
    })
    $(".regist-box a").on('click', function() {
        $(".regist-box").hide()
        $(".login-box").show()
    })
})