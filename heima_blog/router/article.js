const express = require('express')

const router = express.Router()

const ctrl = require('../conteoller/article.js')

// 展示文章页面
router.get('/article/add', ctrl.showAddArticlePage)

// 添加新文章
router.post('/article/add', ctrl.addArticle)

// 文章详情
router.get('/article/info/:id',ctrl.showArticleDetail)

// 获取编辑文章详情
router.get('/article/edit/:id',ctrl.showEditPage)

// 保存编辑
router.post('/article/edit',ctrl.editAticle)

module.exports = router