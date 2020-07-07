const db = require('../db.js')

//转保留两位小数的数
var getFloatStr = (num)=> {
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

//获得还车记录
exports.getReturns = (req, res) => {
    const sql = 'select * from returnRecord order by returnTime desc'
    db.base(sql, null, (result) => {
        result.forEach(element => {
            element.rentMoney = getFloatStr(element.rentMoney)
        });
        res.json(result)
    })

}

//查询还车记录
exports.getReturnById = (req, res) => {
    let data = req.params.rentId
    let sql = 'select * from returnRecord where rentId = ?'
    db.base(sql, data, (result) => {
        res.json(result)
    })
}

//添加还车记录
exports.addReturn = (req, res) => {
    let info = req.body
    let sql = "insert into returnRecord select *,?, datediff(rentToTime,rentFromTime) \
    *(select carRentStandard from carMessage where carMessage.carId=rentRecord.carId) \
    from rentRecord where rentId = ?"
    db.base(sql, [info.time, info.rentId], (result) => {
        if (result.affectedRows == 1) {
            res.json({ flag: 1 })
        }
        else {
            res.json(result.error)
        }
    })
}

//查询租金
exports.getMoney = (req, res) => {
    let info = req.params
    const sql = 'select returnTime,rentMoney from returnRecord\
    where returnTime between ? and ? order by returnTime'
    db.base(sql, [info.rentFromTime,info.rentToTime], (result) => {
        result.forEach(element => {
            element.rentMoney = getFloatStr(element.rentMoney)
        });
        res.json(result)
    })

}
