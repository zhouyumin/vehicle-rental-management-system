//转保留两位小数的数
exports.getFloatStr = (num) => {
    num += ''
    num = num.replace(/[^0-9|\.]/g, '') //清除字符串中的非数字非.字符

    if (/^0+/) //清除字符串开头的0
        num = num.replace(/^0+/, '')
    if (!/\./.test(num)) //为整数字符串在末尾添加.00
        num += '.00'
    if (/^\./.test(num)) //字符以.开头时,在开头添加0
        num = '0' + num
    num += '00'        //在字符串末尾补零
    num = num.match(/\d+\.\d{2}/)[0]
    return num
}