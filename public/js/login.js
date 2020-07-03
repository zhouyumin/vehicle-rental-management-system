function login() {
    var form = $('form.login')
    $.ajax({
        type: 'post',
        url: '/login',
        data: form.serialize(),
        dataType: 'json',
        success: function (data) {
        window.open('/','_self')
        },
        error: function(){
            alert('登入失败，请重新登入')
            form.find('input[name=username]').val('')
            form.find('input[name=password]').val('')
        }
    })
}
function register(){
    alert('请联系数据库管理员注册账号')
}