const db = require('../db.js')
//获得还车记录
exports.getReturns = (req, res)=>{
    const sql = 'select * from returnRecord order by returnTime desc'
    db.base(sql,null,(result)=>{
        res.json(result)
    })

}

//查询还车记录
exports.getReturnById=(req,res)=>{
    let data = req.params.rentId
    let sql = 'select * from returnRecord where rentId = ?'
    db.base(sql,data,(result)=>{
        res.json(result)
    })
}

//添加还车记录
exports.addReturn=(req,res)=>{
    let info = req.body
    let sql = "insert into returnRecord select *,? from rentRecord where rentId = ?"
    db.base(sql,[info.time, info.rentId], (result)=>{
        if(result.affectedRows == 1){
            res.json({flag:1})
        }
        else{
            res.json(result.error)
        }
    })
}
