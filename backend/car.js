const db = require('./db.js')
//获得车辆信息表
exports.getCars = (req, res)=>{
    const sql = 'select * from carMessage'
    db.base(sql,null,(result)=>{
        res.json(result)
    })

}

//添加车辆信息
exports.addCar = (req,res)=>{
    let info = req.body
    let sql = 'insert into carMessage set ?'
    db.base(sql , info,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag:1})
        }
        else{
            res.json(result.error)
        }
    })
}
//获取车辆信息
exports.getCarById=(req,res)=>{
    let data = req.params.carId
    let sql = 'select * from carMessage where carId = ?'
    db.base(sql,data,(result)=>{
        res.json(result)
    })
}

exports.getCarByName=(req,res)=>{
    let data = req.params.carName
    let sql = 'select * from carMessage where carName = ?'
    db.base(sql,data,(result)=>{
        res.json(result)
    })
}

//修改车辆信息
exports.editCar = (req,res)=>{
    let info = req.body
    let sql = 'update carMessage set ? where carId=?'
    db.base(sql , [info,info.carId],(result)=>{
        if(result.affectedRows == 1){
            res.json({flag:1})
        }
        else{
            res.json(result.error)
        }
    })
}