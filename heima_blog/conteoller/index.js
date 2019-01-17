const conn = require('../db/index.js')

// 展示首页页面
const showIndexPage = (req, res) => {
    // 每页显示3数据
    const pagesize = 3
    const nowpage = Number(req.query.page) || 1

    const sql = `select blog_article.id, blog_article.title, blog_article.ctime, blog_user.nickname 
    from blog_article 
    LEFT JOIN blog_user
    ON blog_article.authorId=blog_user.id
    ORDER BY blog_article.id desc limit ${(nowpage - 1) * pagesize}, ${pagesize};
    select count(*) as count from blog_article`
    conn.query(sql, (err, result) => {
        if (err) {
            return res.render('index.ejs', {
                user: req.session.user,
                login: req.session.login,
                // 文章列表
                article:[]
            })
        }
        // 总页数
        const totalPage = Math.ceil(result[1][0].count / pagesize)

        res.render('index.ejs',{
            user:req.session.user,
            login:req.session.login,
            article:result[0],
            // 总页数
            totalPage:totalPage,
            // 当前展示的是第几页
            nowpage:nowpage
        })
    })
}

module.exports = {
    showIndexPage
}