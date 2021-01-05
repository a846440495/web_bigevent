$(function() {
    var layer = layui.layer
    var form = layui.form
    InitArtCatelist()


    function InitArtCatelist() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) return layer.msg('获取文章分类列表失败')
                var htmlstr = template('tpl_cate', res)
                $('tbody').html(htmlstr)
                    // console.log(res);
            }
        });
    }
    var index = null
    $('#addcate').on('click', () => {
        index = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('#dialog_add').html(),
            area: ['500px', '250px']
        });
    })
    $('body').on('submit', '#formcate', function(e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg('新增文章分类失败')
                layer.msg('新增文章分类成功')
                layer.close(index)
                InitArtCatelist()
            }
        });
    })
    var editindex = null
    $('tbody').on('click', '#edit', function() {
        editindex = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $('#dialog_edit').html(),
            area: ['500px', '250px']
        });
        var id = $(this).attr('data-id')
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function(res) {
                form.val('formedit', res.data)
            }
        });
    })

    $('body').on('submit', '#formedit', function(e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg('更新分类信息失败')
                layer.msg('更新分类信息成功')
                layer.close(editindex)
            }
        });
    })
    $('tbody').on('click', '#delete', function() {
        var id = $(this).siblings().attr('data-id')

        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/" + id,
                success: function(res) {
                    // console.log(res);
                    if (res.status !== 0) return layer.msg('删除文章分类失败')
                    layer.msg('删除文章分类成功')
                    InitArtCatelist()
                }
            });
            layer.close(index);
        });





    })
})