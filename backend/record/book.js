const db = require('../db.js')
//获得预约记录
exports.getBooks = (req, res)=>{
    const sql = 'select * from bookRecord order by rentToTime'
    db.base(sql,null,(result)=>{
        res.json(result)
    })

}

//查询预约信息
exports.getBookById=(req,res)=>{
    let data = req.params.rentId
    let sql = 'select * from bookRecord where rentId = ?'
    db.base(sql,data,(result)=>{
        res.json(result)
    })
}

//履约
exports.fulfillBook=(req,res)=>{
    let info = req.params
    let sql = `insert into rentRecord select rentId, clientId, \
    carId, ?, rentType, rentFromTime, rentToTime from bookRecord where rentId = ?;\
    update driverMessage set driverState='已接单' where driverId=?`
    info.driverId=='null'?info.driverId=null:null
    db.base(sql ,[info.driverId,info.rentId,info.driverId],(result)=>{
        if(result[0].affectedRows == 1){
            res.json({flag:1})
        }
        else{
            res.json(result[0].error)
        }
    })
}

//添加预约记录
exports.addBook=(req,res)=>{
    let info = req.body
    let sql = 'insert into bookRecord set ?'
    db.base(sql , info,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag:1})
        }
        else{
            res.json(result.error)
        }
    })
}

//修改预约记录
exports.editBook=(req,res)=>{
    let data = req.body
    let sql = 'update bookRecord set ? where rentId = ?'
    db.base(sql,[data,data.rentId],(result)=>{
        if(result.affectedRows == 1){
            res.json({flag:1})
        }
        else{
            res.json(result.error)
        }
    })
}

//删除预约记录
exports.deleteBook=(req,res)=>{
    let rentId = req.params.rentId
    let sql = 'delete from bookRecord where rentId = ?'
    db.base(sql ,rentId,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag:1})
        }
        else{
            res.json(result.error)
        }
    })
}