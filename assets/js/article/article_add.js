$(function() {
    var form = layui.form
    var layer = layui.layer
    $.ajax({
        type: "GET",
        url: "/my/article/cates",
        success: function(res) {
            // console.log(res);
            var html = template('tpl_sel', res)
            $('#select-cate').html(html)
            form.render()
        }
    });

    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    $image.cropper(options)


    $('#choose').on('click', function() {
        console.log(1);
        $('#one').click()
    })
    $('#one').on('change', function(e) {

        var file = e.target.files[0]

        if (file.length === 0) {
            return
        }
        var newImgURL = URL.createObjectURL(file)

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })


    var art_state = '已发布'

    $('#save').click(function() {
        art_state = '草稿'
    })


    $('#addform').on('submit', function(e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])
        fd.append('state', art_state)

        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                addArticle(fd)
            })



    })

    function addArticle(fd) {
        $.ajax({
            type: "POST",
            url: "/my/article/add",
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) return layer.msg('发表文章失败')
                layer.msg('发表文章成功')
                window.parent.$('#list').click()
            }
        });
    }

})