$(function () {
    // 初始化数据列表
    function initList(url) {
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            success: function (data) {
                if (data == '') {
                    alert('租用记录为空')
                }
                // 渲染数据列表
                var html = template('template', { list: data })
                //渲染模板
                $('#dataList').html(html)

                //绑定操作事件
                $('#dataList').find('tr').each(function (index, element) {
                    const td = $(element).find('td:eq(7)')
                    const rentId = $(element).find('td:eq(0)').text()
                    //绑定履约操作
                    td.find('a:eq(0)').click(function () {
                        fulfill(rentId)
                    })
                })
            }
        })
    }
    initList('/books')

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
            initList('/books/book/' + rentId)
        }
    }
    function fulfill(rentId) {
        $.ajax({
            type: 'put',
            url: '/books/book/'+rentId,
            dataType: 'json',
            success: function(result){
                if(result.flag==1){
                    $.ajax({
                        type: 'delete',
                        url: '/books/book/'+rentId,
                        dataType: 'json',
                        success: function(result){
                            if(result.flag==1){
                                initList('/books')
                                alert('履约成功')
                            }
                            else{
                                alert('[error]:' + result.sqlMessage)
                            }
                        },
                        error: function(){
                            alert('error')
                        }
                    })
                }
                else {
                    alert('[error]:' + result.sqlMessage)
                }
            },
            error: function(){
                alert('error')
            }
        })
    }
})