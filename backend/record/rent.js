const db = require('../db.js')
//获得租用记录
exports.getRecords = (req, res)=>{
    const sql = 'select * from rentRecord order by rentToTime'
    db.base(sql,null,(result)=>{
        res.json(result)
    })

}

//获取订单信息
exports.getRecordById=(req,res)=>{
    let data = req.params.rentId
    let sql = 'select * from rentRecord where rentId = ?'
    db.base(sql,data,(result)=>{
        res.json(result)
    })
}

//续租订单
exports.renewTime = (req,res)=>{
    let info = req.body
    let sql = 'update rentRecord set ? where rentId=?'
    db.base(sql , [info,info.rentId],(result)=>{
        if(result.affectedRows == 1){
            res.json({flag:1})
        }
        else{
            res.json(result.error)
        }
    })
}

//添加订单
exports.addRecord=(req,res)=>{
    let info = req.body
    if (info.driverId==''){
        info.driverId=null
    }
    let sql = `insert into rentRecord set ?;update carMessage set carState='已租用' where carId=?;\
    update driverMessage set driverState='已接单' where driverId=?;`
    db.base(sql , [info,info.carId,info.driverId],(result)=>{
        if(result[0].affectedRows == 1){
            res.json({flag:1})
        }
        else{
            res.json(result[0].error)
        }
    })
}