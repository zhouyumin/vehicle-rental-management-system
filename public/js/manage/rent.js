$(function () {
    const form = $('#rentForm')
    //绑定出租车辆
    $('#rent').click(function(){
        var mark = new MarkBox(600,400,'出租车辆',form.get(0))
        form.get(0).reset()
        form.find('input[name=rentFromTime]').val(today())
        form.find('input[name=rentToTime]').val(today())
        mark.init()
    })
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
            url: '/records/record',
            data: form.serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.flag == 1) {
                    alert('租车成功')
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