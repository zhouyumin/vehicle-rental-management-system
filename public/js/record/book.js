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
                    //绑定修改操作
                    td.find('a:eq(1)').click(function () {
                        editBook(element, rentId)
                    })
                    //绑定取消操作
                    td.find('a:eq(2)').click(function () {
                        cancel(rentId, 'cancel')
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
        var driverId = prompt('请分配司机，输入司机编号，若不分配司机可不输入')
        if (driverId == null) {
            return
        }
        driverId == '' ? driverId = null : null
        $.ajax({
            type: 'put',
            url: '/books/book/' + rentId + '/' + driverId,
            dataType: 'json',
            success: function (result) {
                if (result.flag == 1) {
                    cancel(rentId, 'delete')
                }
                else {
                    alert('[error]:' + result.sqlMessage)
                }
            },
            error: function () {
                alert('error')
            }
        })
    }
    //修改操作
    function editBook(element, rentId) {
        var form = $('#editBookForm')
        var data = $(element).find('td')
        //填充表单
        form.find('input[name=rentId]').val($(data.get(0)).text())
        form.find('input[name=carId]').val($(data.get(2)).text())
        form.find('select[name=rentType]').val($(data.get(3)).text())
        form.find('input[name=rentFromTime]').val($(data.get(4)).text())
        form.find('input[name=rentToTime]').val($(data.get(5)).text())
        form.find('input[name=bookTime]').val(today())
        //弹窗
        var mark = new MarkBox(600, 300, '修改预约信息', form.get('0'))
        mark.init()
        form.find('input[type=button]').unbind('click').click(function () {
            $.ajax({
                type: 'put',
                url: '/books/book',
                data: form.serialize(),
                dataType: 'json',
                success: function (result) {
                    if (result.flag == 1) {
                        mark.close()
                        initList('/books')
                        alert('修改成功')
                    }
                    else {
                        mark.close()
                        alert('[error]:' + result.sqlMessage)
                    }
                },
                error: function () {
                    alert('error')
                }
            })
        })
    }
    //取消操作
    function cancel(rentId, type) {
        console.log(type)
        if (type == 'cancel') {
            var res = confirm("是否取消该订单？")
            if (res == false) {
                return
            }
        }
        $.ajax({
            type: 'delete',
            url: '/books/book/' + rentId,
            dataType: 'json',
            success: function (result) {
                if (result.flag == 1) {
                    initList('/books')
                    if (type == 'cancel')
                        alert('取消成功')
                    else if (type == 'delete') {
                        alert('履约成功')
                    }
                }
                else {
                    alert('[error]:' + result.sqlMessage)
                }
            },
            error: function () {
                alert('error')
            }
        })
    }
})