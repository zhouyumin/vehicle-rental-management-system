$(function () {
    // 初始化数据列表
    function initList(url) {
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            success: function (data) {
                if(data == ''){
                    alert('信息为空')
                }
                // 渲染数据列表
                var html = template('template', { list: data })
                //渲染模板
                $('#dataList').html(html)

                //绑定操作事件
                $('#dataList').find('tr').each(function (index, element) {
                    const td = $(element).find('td:eq(7)')
                    const clientId = $(element).find('td:eq(0)').text()
                    //绑定修改客户信息操作
                    td.find('a:eq(0)').click(function () {
                        editClient(clientId)
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
    search()
    function search () {
        $('#searchClient').click(function(){
            var clientName = $('div.operation').find('input[name=clientName]').val()
            if(clientName ==''){
                alert('姓名未输入')
            }
            initList('/clients/clientName/'+clientName)
        })
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
                            initList('clients')
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
    function editClient(clientId) {
        //重置表单
        clearForm()
        var form = $('#addClientForm')
        $.ajax({
            type: 'get',
            url: '/clients/client/' + clientId,
            dataType: 'json',
            success: function (result) {
                //初始化弹窗
                var mark = new MarkBox(600, 400, '修改客户信息', form.get(0))
                mark.init()
                // $('#dialogTitle').text('修改客户信息')
                //填充表单
                var data = result[0]
                const clientId = form.find('input[name=clientId]')
                clientId.val(data.clientId)
                clientId.hide()
                $('label.clientId').hide()
                form.find('input[name=clientIdCard]').val(data.clientIdCard)
                form.find('input[name=clientName]').val(data.clientName)
                form.find('input[name=clientSex]').val(data.clientSex)
                form.find('input[name=clientAge]').val(data.clientAge)
                form.find('input[name=clientPhone]').val(data.clientPhone)
                form.find('input[name=clientAddress]').val(data.clientAddress)
                //绑定提交表单数据
                form.find('input[type=button]').unbind('click').click(function () {
                    $.ajax({
                        type: 'put',
                        url: '/clients/client',
                        data: form.serialize(),
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
        form.find('input[name=clientId]').show()
        $('label.clientId').show()
    }
})