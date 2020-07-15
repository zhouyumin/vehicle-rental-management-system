const db = require('../db.js')
const toFloat = require('../getFloatStr.js')

//获得还车记录
exports.getReturns = (req, res) => {
    const sql = 'select * from returnRecord order by returnTime desc'
    db.base(sql, null, (result) => {
        result.forEach(element => {
            element.rentMoney = toFloat.getFloatStr(element.rentMoney)
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
    let sql = "insert into returnRecord select *,datediff(rentToTime,rentFromTime),?, datediff(rentToTime,rentFromTime)* \
    (select carRentStandard from carMessage where carMessage.carId=rentRecord.carId) \
    from rentRecord where rentId = ?;update driverMessage set driverState='未接单'\
    where driverId = (select driverId from rentRecord where rentId=?);\
    update carMessage set carState = '可出租' where carId = (select carId from rentRecord where rentId=?);\
    delete from rentRecord where rentId = ?;"
    db.base(sql, [info.time, info.rentId, info.rentId,info.rentId,info.rentId], (result) => {
        if (result[0].affectedRows == 1) {
            res.json({ flag: 1 })
        }
        else {
            res.json(result[0].error)
        }
    })
}

//查询租金
exports.getMoney = (req, res) => {
    let info = req.params
    const sql = 'select returnTime,sum(rentMoney) as rentMoney from returnRecord\
    where returnTime between ? and ? group by returnTime order by returnTime'
    db.base(sql, [info.rentFromTime,info.rentToTime], (result) => {
        result.forEach(element => {
            element.rentMoney = toFloat.getFloatStr(element.rentMoney)
        });
        res.json(result)
    })

}
