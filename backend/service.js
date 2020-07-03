const db = require('./db.js')
// 登入验证
exports.checkLogin = (req, res) => {
    const sql = 'select * from Admin where username = ? and passwd = ?'
    const info = req.body
    const data = [info.username, info.password]
    db.base(sql, data, (result) => {
        if (result.length) { // 登录成功
            req.session.userName = info.username
        }
        res.json(result[0])
    })
}

// 验证session
exports.checkSession = (req, res, next) => {
    url = req.url
    if (url == '/login.html' || req.url.startsWith('/css/') || req.url.startsWith('/images/') || req.url.startsWith('/js/'))// 如果是登入页面就跳过
        next()
    else if (req.session.userName) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        next()
    }
    else {
        res.redirect('login.html')
    }
}
