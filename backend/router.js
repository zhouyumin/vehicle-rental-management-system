const express = require('express')
const client = require('./client.js')
const car = require('./car.js')
const session = require('express-session')
const service = require('./service.js')
const bodyparser = require('body-parser')
const router = express.Router()

router.use(session({
    secret: 'secret', // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
        maxAge: 1000 * 60 * 3 * 60, // 设置 session 的有效时间，单位毫秒
    }
}))

// router.use(bodyparser.json()) // 使用bodyparder中间件，
router.use(bodyparser.urlencoded({ extended: true }))

// 验证登入
router.post('/login', service.checkLogin)

// //判断session
// router.use(service.checkSession)

//获得客户信息表
router.get('/clients',client.getClients)
//添加客户信息
router.post('/clients/client',client.addClient)
//获取客户信息
router.get('/clients/client/:clientId',client.getClientById)
router.get('/clients/clientName/:clientName',client.getClientByName)
//修改客户信息
router.put('/clients/client',client.editClient)
//删除客户信息
// router.delete('/clients/client/:clientId',client.deleteClient)

//获得车辆信息表
router.get('/cars',car.getCars)
//添加车辆信息
router.post('/cars/car',car.addCar)
//获取车辆信息
router.get('/cars/car/:carId',car.getCarById)
router.get('/cars/carName/:carName',car.getCarByName)
//修改车辆信息
router.put('/cars/car',car.editCar)

module.exports = router