const express =require('express')
// 创建路由对象
const router = express.Router()

const ctrl = require('../conteoller/user.js')

// 用户请求的注册页面
router.get('/register',ctrl.showRegisterPage)

// 用户请求的登录页面
router.get('/login', ctrl.showLoginPage)

// 注册新用户
router.post('/register', ctrl.reg)

// 登录
router.post('/login',ctrl.login)

// 注销
router.get('/logout',ctrl.logout)
// 暴露对象
module.exports = router