const db = require('./db.js')
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

//还车时删除租用记录
exports.deleteRecord = (req,res)=>{
    let rentId = req.params.rentId
    sql = 'delete from rentRecord where rentId = ?'
    db.base(sql, rentId,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag:1})
        }
        else{
            res.json(result.error)
        }
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
