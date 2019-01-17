const express =require('express')
// 创建路由对象
const router = express.Router()

// 导入自己的业务模块
const ctrl = require('../conteoller/index.js')
// 首页
router.get('/', ctrl.showIndexPage)

module.exports = router