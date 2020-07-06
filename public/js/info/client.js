$(function () {
    // 初始化数据列表
    function initList(url) {
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            success: function (data) {
                if (data == '') {
                    alert('客户信息为空')
                }
                // 渲染数据列表
                var html = template('template', { list: data })
                //渲染模板
                $('#dataList').html(html)

                //绑定操作事件
                $('#dataList').find('tr').each(function (index, element) {
                    const td = $(element).find('td:eq(7)')
                    //绑定修改客户信息操作
                    td.find('a:eq(0)').click(function () {
                        editClient(element)
                    })
                    // //绑定删除客户信息操作
                    // td.find('a:eq(1)').click(function () {
                    //     deleteClient(clientId)
                    // })
                })

                //绑定添加客户信息操作
                addClient()
            }
        })
    }
    initList('/clients')

    //绑定查询操作
    $('#search').click(search)
    var clientNameInput = $('div.operation').find('input[name=clientName]')
    clientNameInput.keyup(function (e) {
        if (e.keyCode == 13) {
            search()
        }
    })
    function search() {
        var clientName = clientNameInput.val()
        if (clientName == '') {
            alert('姓名未输入')
        }
        else {
            initList('/clients/clientName/' + clientName)
        }
    }

    //添加客户信息
    function addClient() {
        $('#addClient').click(function () {
            //重置表单
            clearForm()
            var form = $('#addClientForm')
            //初始化弹窗
            var mark = new MarkBox(600, 400, '添加客户', form.get(0))
            mark.init()
            // $('#dialogTitle').text('添加客户')
            //绑定添加事件
            form.find('input[type=button]').unbind('click').click(function () {
                $.ajax({
                    type: 'post',
                    url: '/clients/client',
                    data: form.serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.flag == 1) {
                            mark.close()
                            initList('/clients')
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

    //编辑客户信息
    function editClient(element) {
        //重置表单
        clearForm()
        var form = $('#addClientForm')
        //初始化弹窗
        var mark = new MarkBox(600, 400, '修改客户信息', form.get(0))
        mark.init()
        // $('#dialogTitle').text('修改客户信息')
        //填充表单
        var data = $(element).find('td')
        const clientId = $(data.get(0)).text()
        form.find('input[name=clientIdCard]').val($(data.get(1)).text())
        form.find('input[name=clientName]').val($(data.get(2)).text())
        form.find('input[name=clientSex]').val($(data.get(3)).text())
        form.find('input[name=clientAge]').val($(data.get(4)).text())
        form.find('input[name=clientPhone]').val($(data.get(5)).text())
        form.find('input[name=clientAddress]').val($(data.get(6)).text())
        //绑定提交表单数据
        form.find('input[type=button]').unbind('click').click(function () {
            $.ajax({
                type: 'put',
                url: '/clients/client',
                data: form.serialize()+'&clientId='+clientId,
                dataType: 'json',
                success: function (data) {
                    if (data.flag == 1) {
                        mark.close()
                        initList('/clients')
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
    // //删除客户信息
    // function deleteClient(clientId) {
    //     const r = window.confirm('是否删除客户'+clientId+'的记录')
    //     if(r==false){
    //         return
    //     }
    //     $.ajax({
    //         type: 'delete',
    //         url: 'clients/client/' + clientId,
    //         dataType: 'json',
    //         success: function (data) {
    //             if (data.flag == 1) {
    //                 initList();
    //             }
    //             else {
    //                 alert('[error]:' + data.sqlMessage)
    //             }
    //         }
    //     })
    // }
    //重置表单
    function clearForm() {
        var form = $('#addClientForm')
        form.get(0).reset()
    }
})