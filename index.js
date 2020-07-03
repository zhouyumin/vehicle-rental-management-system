const express = require('express')
const router = require('./backend/router')
const app = express()

app.use(router)
app.use(express.static('public'))


app.listen(3000, () => {
    console.log('http://127.0.0.1:3000 ' + 'is running')
})