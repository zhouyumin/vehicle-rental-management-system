const express = require('express')
const client = require('./info//client.js')
const car = require('./info/car.js')
const driver = require('./info/driver.js')
const rent = require('./record/rent.js')
const returnRecord = require('./record/return.js')
const book = require('./record/book.js')
const session = require('express-session')
const service = require('./service.js')
const bodyparser = require('body-parser')
const router = express.Router()

router.use(session({
    secret: 'secret', // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
        maxAge: 1000 * 60 * 30, // 设置 session 的有效时间，单位毫秒
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
//查询客户信息
router.get('/clients/clientName/:clientName',client.getClientByName)
//修改客户信息
router.put('/clients/client',client.editClient)
//删除客户信息
// router.delete('/clients/client/:clientId',client.deleteClient)

//获得车辆信息表
router.get('/cars',car.getCars)
//添加车辆信息
router.post('/cars/car',car.addCar)
//查询车辆信息
router.get('/cars/car/:carId',car.getCarById)
//修改车辆信息
router.put('/cars/car',car.editCar)


//获得司机信息表
router.get('/drivers',driver.getDrivers)
//获得司机驾驶记录
router.get('/drivers/drive/:driverId',driver.getDrive)
//添加司机信息
router.post('/drivers/driver',driver.addDriver)
//查询司机信息
router.get('/drivers/driverName/:driverName',driver.getDriverByName)
//修改司机信息
router.put('/drivers/driver',driver.editDriver)

//获得租用记录
router.get('/records',rent.getRecords)
//查询订单信息
router.get('/records/record/:rentId',rent.getRecordById)
//续租订单
router.put('/records/record', rent.renewTime)
//添加租用记录
router.post('/records/record/',rent.addRecord)

//获得还车记录
router.get('/returns',returnRecord.getReturns)
//查询还车记录
router.get('/returns/return/:rentId',returnRecord.getReturnById)
//添加还车记录
router.put('/returns/return',returnRecord.addReturn)
//获得租金
router.get('/returns/money/:rentFromTime/:rentToTime',returnRecord.getMoney)

//获得预约记录
router.get('/books',book.getBooks)
//查询预约信息
router.get('/books/book/:rentId', book.getBookById)
//履约
router.put('/books/book/:rentId/:driverId', book.fulfillBook)
//添加预约记录
router.post('/books/book',book.addBook)
//修改预约记录
router.put('/books/book',book.editBook)
//删除预约记录
router.delete('/books/book/:rentId', book.deleteBook)

module.exports = router