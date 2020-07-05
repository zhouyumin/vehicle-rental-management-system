$(function () {
    // 初始化数据列表
    function initList(url) {
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            success: function (data) {
                if (data == '') {
                    alert('还车记录为空')
                }
                // 渲染数据列表
                var html = template('template', { list: data })
                //渲染模板
                $('#dataList').html(html)
            }
        })
    }
    initList('/returns')

    //绑定查询操作
    $('#search').click(search)
    var rentIdInput = $('div.operation').find('input[name=rentId]')
    rentIdInput.keyup(function (e) {
        if (e.keyCode == 13) {
            search()
        }
    })
    function search() {
        var rentId = rentIdInput.val()
        if (rentId == '') {
            alert('订单号未输入')
        }
        else {
            initList('/returns/return/' + rentId)
        }
    }
})