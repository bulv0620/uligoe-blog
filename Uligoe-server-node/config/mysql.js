const mysql = require('mysql2/promise')
const { logger } = require('../logger')
const { SQL_USERNAME, SQL_PASSWORD } = require('./keys')

const SQL_IP_ADDRESS = 'localhost'
const SQL_PORT = 3306
const SQL_DATABASE = 'uligoe_blog'

const pool = mysql.createPool({
    host: SQL_IP_ADDRESS,
    port: SQL_PORT,
    user: SQL_USERNAME,
    password: SQL_PASSWORD,
    database: SQL_DATABASE,
    dateStrings: true
})

// params 进行添加或修改的数据
const queryFn = async (sql, params) => {
    try {
        const conn = await pool.getConnection()
        const data = await conn.execute(sql, params)
        conn.release()
        return data
    } catch (err) {
        logger.error(err)
        throw err
    }
}

module.exports = {
    queryFn
}