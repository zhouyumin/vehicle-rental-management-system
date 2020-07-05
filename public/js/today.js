//获取当天日期
function today() {
    var time = new Date()
    var day = ("0" + time.getDate()).slice(-2)
    var month = ("0" + (time.getMonth() + 1)).slice(-2)
    return time.getFullYear() + "-" + (month) + "-" + (day)
}