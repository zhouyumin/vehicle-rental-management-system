$(function () {
    // 初始化数据列表
    function initList(url) {
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            success: function (data) {
                if (data == '') {
                    alert('司机信息为空')
                }
                // 渲染数据列表
                var html = template('template', { list: data })
                //渲染模板
                $('#dataList').html(html)

                //绑定操作事件
                $('#dataList').find('tr').each(function (index, element) {
                    const td = $(element).find('td:eq(8)')
                    //绑定修改司机信息操作
                    td.find('a:eq(0)').click(function () {
                        editDriver(element)
                    })
                })
                //绑定查看驾驶记录
                $('#dataList').find('tr').each(function (index, element) {
                    const td = $(element).find('td:eq(8)')
                    const driverId = $(element).find('td:eq(0)').text()
                    //绑定修改司机信息操作
                    td.find('a:eq(1)').click(function () {
                        $.ajax({
                            type: 'get',
                            url: '/drivers/drive/'+driverId,
                            dataType: 'json',
                            success: function(data){
                                //渲染数据列表
                                var html = template('driveTemplate',{list:data})
                                //渲染模板
                                $('#driveList').html(html)
                                var mark = new MarkBox(600,400,'司机'+driverId+'的驾驶记录',$('#drive').get(0))
                                mark.init()
                            },
                            error: function(){
                                alert('error')
                            }
                        })
                    })
                })

                //绑定添加司机信息操作
                addDriver()
            }
        })
    }
    initList('/drivers')

    //绑定查询操作
    $('#search').click(search)
    var driverNameInput = $('div.operation').find('input[name=driverName]')
    driverNameInput.keyup(function (e) {
        if (e.keyCode == 13) {
            search()
        }
    })
    function search() {
        var driverName = driverNameInput.val()
        if (driverName == '') {
            alert('姓名未输入')
        }
        else {
            initList('/drivers/driverName/' + driverName)
        }
    }

    //添加司机信息
    function addDriver() {
        $('#addDriver').click(function () {
            //重置表单
            clearForm()
            var form = $('#addDriverForm')
            //初始化弹窗
            var mark = new MarkBox(600, 400, '添加司机', form.get(0))
            mark.init()
            //绑定添加事件
            form.find('input[type=button]').unbind('click').click(function () {
                $.ajax({
                    type: 'post',
                    url: '/drivers/driver',
                    data: form.serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.flag == 1) {
                            mark.close()
                            initList('/drivers')
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

    //编辑司机信息
    function editDriver(element) {
        //重置表单
        clearForm()
        var form = $('#addDriverForm')

        //初始化弹窗
        var mark = new MarkBox(600, 400, '修改司机信息', form.get(0))
        mark.init()
        // $('#dialogTitle').text('修改司机信息')
        //填充表单
        var data = $(element).find('td')
        const driverId = $(data.get(0)).text()
        form.find('input[name=driverIdCard]').val($(data.get(1)).text())
        form.find('input[name=driverName]').val($(data.get(2)).text())
        form.find('select[name=driverSex]').val($(data.get(3)).text())
        form.find('input[name=driverAge]').val($(data.get(4)).text())
        form.find('input[name=driverPhone]').val($(data.get(5)).text())
        form.find('input[name=driverAddress]').val($(data.get(6)).text())
        form.find('select[name=driverState]').val($(data.get(7)).text())
        //绑定提交表单数据
        form.find('input[type=button]').unbind('click').click(function () {
            $.ajax({
                type: 'put',
                url: '/drivers/driver',
                data: form.serialize()+'&driverId='+driverId,
                dataType: 'json',
                success: function (data) {
                    if (data.flag == 1) {
                        mark.close()
                        initList('/drivers')
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
        var form = $('#addDriverForm')
        form.get(0).reset()
    }
})