const db = require('./db.js')
//获得司机信息表
exports.getDrivers = (req, res)=>{
    const sql = 'select * from driverMessage'
    db.base(sql,null,(result)=>{
        res.json(result)
    })

}

//添加司机信息
exports.addDriver = (req,res)=>{
    let info = req.body
    let sql = 'insert into driverMessage set ?'
    db.base(sql , info,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag:1})
        }
        else{
            res.json(result.error)
        }
    })
}
//获取司机信息
exports.getDriverByName=(req,res)=>{
    let data = req.params.driverName
    let sql = 'select * from driverMessage where driverName = ?'
    db.base(sql,data,(result)=>{
        res.json(result)
    })
}

//修改司机信息
exports.editDriver = (req,res)=>{
    let info = req.body
    let sql = 'update driverMessage set ? where driverId=?'
    db.base(sql , [info,info.driverId],(result)=>{
        if(result.affectedRows == 1){
            res.json({flag:1})
        }
        else{
            res.json(result.error)
        }
    })
}
