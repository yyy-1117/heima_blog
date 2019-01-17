// 引入 mysql 
const mysql = require('mysql')

// 连接数据库
const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'mysql_001',
    // 开启  可以执行多条sql语句的功能
    multipleStatements:true
})

module.exports = conn