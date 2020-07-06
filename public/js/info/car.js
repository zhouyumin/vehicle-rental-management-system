$(function () {
    // 初始化数据列表
    function initList(url) {
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            success: function (data) {
                if (data == '') {
                    alert('车辆信息为空')
                }
                // 渲染数据列表
                var html = template('template', { list: data })
                //渲染模板
                $('#dataList').html(html)

                //绑定操作事件
                $('#dataList').find('tr').each(function (index, element) {
                    const td = $(element).find('td:eq(6)')
                    //绑定修改车辆信息操作
                    td.find('a:eq(0)').click(function () {
                        editcar(element)
                    })
                })

                //绑定添加车辆信息操作
                addcar()
            }
        })
    }
    initList('/cars')

    //绑定查询操作
    $('#search').click(search)
    var carIdInput = $('div.operation').find('input[name=carId]')
    carIdInput.keyup(function (e) {
        if (e.keyCode == 13) {
            search()
        }
    })
    function search() {
        var carId = carIdInput.val()
        if (carId == '') {
            alert('车名未输入')
        }
        else {
            initList('/cars/car/' + carId)
        }
    }

    //添加车辆信息
    function addcar() {
        $('#addCar').click(function () {
            //重置表单
            clearForm()
            var form = $('#addCarForm')
            form.find('input[name=carBuyTime]').val(today())
            //初始化弹窗
            var mark = new MarkBox(600, 400, '添加车辆', form.get(0))
            mark.init()
            //绑定添加事件
            form.find('input[type=button]').unbind('click').click(function () {
                $.ajax({
                    type: 'post',
                    url: '/cars/car',
                    data: form.serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.flag == 1) {
                            mark.close()
                            initList('/cars')
                            alert('添加成功')
                        }
                        else {
                            mark.close()
                            alert('[error]:' + data.sqlMessage)
                        }
                    }
                })
            })
        })
    }

    //编辑车辆信息
    function editcar(element) {
        //重置表单
        clearForm()
        var form = $('#addCarForm')
        //初始化弹窗
        var mark = new MarkBox(600, 400, '修改车辆信息', form.get(0))
        mark.init()
        // $('#dialogTitle').text('修改车辆信息')
        //填充表单
        var data = $(element).find('td')
        const carId = $(data.get(0)).text()
        form.find('input[name=carType]').val($(data.get(1)).text())
        form.find('input[name=carName]').val($(data.get(2)).text())
        form.find('input[name=carBuyTime]').val($(data.get(3)).text())
        form.find('input[name=carRentStandard]').val($(data.get(4)).text())
        form.find('select[name=carState]').val($(data.get(5)).text())
        //绑定提交表单数据
        form.find('input[type=button]').unbind('click').click(function () {
            $.ajax({
                type: 'put',
                url: '/cars/car',
                data: form.serialize()+'&carId='+carId,
                dataType: 'json',
                success: function (data) {
                    if (data.flag == 1) {
                        mark.close()
                        initList('/cars')
                        alert('修改成功')
                    }
                    else {
                        mark.close()
                        alert('[error]:' + data.sqlMessage)
                    }
                }
            })
        })
    }


    //重置表单
    function clearForm() {
        var form = $('#addCarForm')
        form.get(0).reset()
    }
})