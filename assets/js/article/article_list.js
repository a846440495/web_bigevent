$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;
    $.ajax({
        type: "GET",
        url: "/my/article/cates",
        success: function(res) {
            if (res.status !== 0) return layer.msg('获取文章分类列表失败')
            var str = template('allcate', res)
            $('#sel').html(str)
            form.render()
        }
    });

    var q = {
        pagenum: 1, //页面刚开始默认页数
        pagesize: 2, //每页显示多少条数据
        cate_id: '',
        state: '',
    }


    getArticleList()

    function getArticleList() {
        $.ajax({
            type: "GET",
            url: "/my/article/list",
            data: q,
            success: function(res) {
                if (res.status !== 0) return layer.msg('获取文章列表失败')
                    // console.log(res);
                var html = template('tpl_sel', res)
                $('tbody').html(html)
                renderpage(res.total)
            }
        });
    }


    //实现筛选的功能
    $('#listform').on('submit', function(e) {
            e.preventDefault();
            var cate_id = $('[name=cate_id]').val()
            var state = $('[name=state').val()
            q.cate_id = cate_id
            q.state = state
            getArticleList()
        })
        // 分页功能  
    function renderpage(total) {
        //分页
        laypage.render({
            elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
                ,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limit: q.pagesize,
            curr: q.pagenum,
            count: total, //数据总数，从服务端得到
            jump: function(obj, first) {
                // console.log(obj.curr);
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {

                    getArticleList()
                }
            },
            limits: [2, 3, 5, 10],
        });
    }


    //删除文章列表功能
    $('tbody').on('click', '.delete', function() {
        var denum = $('.delete').length
        var id = $(this).attr('data-id')
        layer.confirm('is not?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: "GET",
                url: "/my/article/delete/" + id,
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) return layer.msg('删除失败')
                    layer.msg('删除成功')
                        //先获取页面上删除按钮的个数
                    console.log(denum);
                    if (q.pagenum > 1) {
                        if (denum == 1) {
                            q.pagenum = q.pagenum - 1
                        }
                    }


                    getArticleList()
                }
            });
            layer.close(index);
        });
    })



})