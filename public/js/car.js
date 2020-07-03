$(function () {
    // 初始化数据列表
    function initList(url) {
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            success: function (data) {
                if (data == '') {
                    alert('信息为空')
                }
                // 渲染数据列表
                var html = template('template', { list: data })
                //渲染模板
                $('#dataList').html(html)

                //绑定操作事件
                $('#dataList').find('tr').each(function (index, element) {
                    const td = $(element).find('td:eq(6)')
                    const carId = $(element).find('td:eq(0)').text()
                    //绑定修改车辆信息操作
                    td.find('a:eq(0)').click(function () {
                        editcar(carId)
                    })
                })

                //绑定添加车辆信息操作
                addcar()
            }
        })
    }
    initList('/cars')

    //绑定查询操作
    search()
    function search() {
        $('#searchCar').click(function () {
            var carName = $('div.operation').find('input[name=carName]').val()
            if (carName == '') {
                alert('车名未输入')
            }
            initList('/cars/carName/' + carName)
        })
    }

    //获取当天日期
    function today() {
        var time = new Date()
        var day = ("0" + time.getDate()).slice(-2)
        var month = ("0" + (time.getMonth() + 1)).slice(-2)
        return time.getFullYear() + "-" + (month) + "-" + (day)
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
                            initList('cars')
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
    function editcar(carId) {
        //重置表单
        clearForm()
        var form = $('#addCarForm')
        $.ajax({
            type: 'get',
            url: '/cars/car/' + carId,
            dataType: 'json',
            success: function (result) {
                //初始化弹窗
                var mark = new MarkBox(600, 400, '修改车辆信息', form.get(0))
                mark.init()
                // $('#dialogTitle').text('修改车辆信息')
                //填充表单
                var data = result[0]
                const carId = form.find('input[name=carId]')
                carId.val(data.carId)
                carId.hide()
                $('label.carId').hide()
                form.find('input[name=carId]').val(data.carId)
                form.find('input[name=carType]').val(data.carType)
                form.find('input[name=carName]').val(data.carName)
                form.find('input[name=carBuyTime]').val(data.carBuyTime)
                form.find('input[name=carRentStandard]').val(data.carRentStandard)
                form.find('select[name=carState]').val(data.carState)
                //绑定提交表单数据
                form.find('input[type=button]').unbind('click').click(function () {
                    $.ajax({
                        type: 'put',
                        url: '/cars/car',
                        data: form.serialize(),
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
        })
    }

    //重置表单
    function clearForm() {
        var form = $('#addCarForm')
        form.get(0).reset()
        form.find('input[name=carId]').show()
        $('label.carId').show()
    }
})