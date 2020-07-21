const db = require('../db.js')
//获得客户信息表
exports.getClients = (req, res)=>{
    const sql = 'select * from clientMessage'
    db.base(sql,null,(result)=>{
        res.json(result)
    })

}

//添加客户信息
exports.addClient = (req,res)=>{
    let info = req.body
    let sql = 'insert into clientMessage set ?'
    db.base(sql , info,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag:1})
        }
        else{
            res.json(result.error)
        }
    })
}

//查询客户信息
exports.getClientByName=(req,res)=>{
    let data = req.params.clientName
    let sql = 'select * from clientMessage where clientName = ?'
    db.base(sql,data,(result)=>{
        res.json(result)
    })
}

//修改客户信息
exports.editClient = (req,res)=>{
    let info = req.body
    let sql = 'update clientMessage set ? where clientId=?'
    db.base(sql , [info,info.clientId],(result)=>{
        if(result.affectedRows == 1){
            res.json({flag:1})
        }
        else{
            res.json(result.error)
        }
    })
}
// //删除客户信息
// exports.deleteClient = (req,res)=>{
//     let data = req.params.clientId
//     let sql = 'delete from clientMessage where clientId=?'
//     db.base(sql,data,(result)=>{
//         if(result.affectedRows == 1){
//             res.json({flag:1})
//         }
//         else{
//             res.json(result.error)
//         }
//     })
// }