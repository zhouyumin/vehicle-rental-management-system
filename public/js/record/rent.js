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
                    const clientId = $(element).find('td:eq(1)').text()
                    //绑定还车操作
                    td.find('a:eq(0)').click(function () {
                        returnCar(rentId);
                    })
                    //绑定续租操作
                    td.find('a:eq(1)').click(function () {
                        renewTime(element)
                    })
                    //绑定催车操作
                    td.find('a:eq(2)').click(function () {
                        alert('已提醒客户 ' + clientId + ' 还车')
                    })
                })
            }
        })
    }
    initList('/records')

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
            initList('/records/record/' + rentId)
        }
    }

    //还车
    function returnCar(rentId) {
        $.ajax({
            // async: false, //同步请求
            type: 'put',
            url: '/returns/return/',
            data: { time: today(), rentId: rentId },
            dataType: 'json',
            success: function (result) {
                if (result.flag == 1) {
                    initList('/records')
                    alert('还车成功')
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
    //续租订单
    function renewTime(element) {
        var form = $('#renewTime')
        //初始化弹窗
        var mark = new MarkBox(300, 200, '续租', form.get(0))
        mark.init()
        //填充表单
        var data = $(element).find('td')
        form.find('input[name=rentId]').val($(data.get(0)).text())
        form.find('input[name=rentToTime]').val($(data.get(6)).text())
        //绑定提交表单数据
        form.find('input[type=button]').unbind('click').click(function () {
            $.ajax({
                type: 'put',
                url: '/records/record',
                data: form.serialize(),
                dataType: 'json',
                success: function (data) {
                    if (data.flag == 1) {
                        mark.close()
                        initList('/records')
                        alert('续租成功')
                    }
                    else {
                        mark.close()
                        alert('[error]:' + data.sqlMessage)
                    }
                }
            })
        })
    }
})