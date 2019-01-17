// 引入获取时间戳模块
const moment = require('moment')

const conn = require('../db/index.js')

const marked = require('marked')


//  添加文章页面
const showAddArticlePage = (req, res) => {
    // 如果用户没有登录就不能访问添加文章页 就跳转到首页
    if (!req.session.login) return res.redirect('/')
    res.render('./article/add.ejs', {
        user: req.session.user,
        login: req.session.login
    })
}

// 添加新文章
const addArticle = (req, res) => {
    // 获取表单的值
    const body = req.body

    // 设置时间
    body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')

    const sql = 'insert into blog_article set ?'
    conn.query(sql,body,(err,result) => {
        if(err) return res.send({msg:`发表文章失败`,status:500})
        if(result.affectedRows !== 1) return res.send({msg:`发表文章失败`,status:501})
        res.send({msg:`发表文章成功`,status:200,insertId:result.insertId})
    })
}

// 文章详情页
const showArticleDetail = (req,res) => {
    // 获取id
    const id =req.params.id

    // 根据id查询文章
    const sql = `select * from blog_article where id =?`
    conn.query(sql,id,(err,result) => {
        if(err) return res.send({msg:`获取文章详情失败`,status:500})
        if(result.length !== 1)  return res.redirect('/')
        // 在调用 res.render 方法之前,要先把 markdown 文本 转换成 html 文本
        const html = marked(result[0].content)
        // 转换完成后赋值
        result[0].content = html
        res.render('./article/info.ejs',{user:req.session.user,login:req.session.login,article:result[0]})
    })
}

// 获取编辑文章详情
const showEditPage = (req,res) => {
    // 如果没有登录就返回首页
    if(!req.session.login) return res.redirect('/')
    const id = req.params.id
    // 根据id查询文章
    const sql = `select * from blog_article where id = ?`
    conn.query(sql,id,(err,result) => {
        if(err) return res.redirect('/')
        if(result.length !== 1) return res.redirect('/')
        res.render('./article/edit.ejs',{user:req.session.user,login:req.session.login,article:result[0]})
        
    })

}

// 编辑文章
const editAticle =(req,res) => {
    const body = req.body;

    const sql = `update blog_article set ? where id= ?`
    conn.query(sql,[body,body.id],(err,result) => {
        if(err) return res.send({msg:`修改文章失败`,status:501})
        if(result.affectedRows !== 1) return res.send({msg:`修改文章失败`,status:502})
        res.send({msg:`ok`,status:200})
    })
}


module.exports = {
    showAddArticlePage,
    addArticle,
    showArticleDetail,
    showEditPage,
    editAticle
}