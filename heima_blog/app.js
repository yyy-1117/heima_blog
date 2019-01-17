// 引入 express
const express = require('express')
// 创建服务器
const app = express()
// 设置模板
app.set('view engine', 'ejs')
// 设置模板存放的路径
app.set('views', './views/')

// 导入express-session 中间件
const session = require('express-session')

app.use(session({
    secret:'这是加密的密钥',
    resave:false,
    saveUninitialized:false
}))
// 路径
const fs = require('fs')
const path = require('path')

// 引入获取post请求参数的模块
const bodyparser = require('body-parser')
// 注册中间件
app.use(bodyparser.urlencoded({
    extended: false
})) 

// 托管
app.use('/node_modules', express.static('./node_modules/'))


// 循环 router 目录并自动注册
fs.readdir(path.join(__dirname, './router'), (err, filename) => {
    if (err) return console.log(`读取 router 目录中的路由失败`)
    // 循环 router目录下的每一个文件名
    filename.forEach(item => {
        // 每循环一次,拼接一个完整的路由模块地址
        // 然后 使用 require 导入这个路由模块
        const router = require(path.join(__dirname, './router', item))
        app.use(router)
    })
})

app.listen(80, () => {
    console.log('http://127.0.0.1:80')
})