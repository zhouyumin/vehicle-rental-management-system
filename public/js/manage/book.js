$(function () {
    const form = $('#bookForm')
    form.find('input[name=rentFromTime]').val(today())
    form.find('input[name=rentToTime]').val(today())
    form.find('input[name=bookTime]').val(today())
    //绑定提交
    form.find('input[type=button]').click(function () {
        const clientId = form.find('input[name=clientId]').val()
        const carId = form.find('input[name=carId]').val()
        if (clientId == '' || carId == '') {
            alert('客户编号或车辆编号为空')
            return
        }
        $.ajax({
            type: 'post',
            url: '/books/book',
            data: form.serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.flag == 1) {
                    alert('预约成功')
                }
                else {
                    alert('[error]:' + data.sqlMessage)
                }
            },
            error: function(){
                alert('发生错误')
            }
        })
    })
})