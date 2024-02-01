const { queryFn } = require('./mysql')
const { success, error, repeat } = require('./response')
const { logger, accessLogger } = require('../logger');

/**
 * 查询
 * @param {Object} ctx 
 * @param {String} sql sql语句
 * @param {Object} config 配置内容
 * @param {Array} config.params 填充值列表
 * @param {string} config.type 返回的类型，默认'json'
 * @param {boolean} config.isObj 查询是否是一个对象，默认为false
 * @param {string} config.msg 成功返回的文本，默认'查询成功'
 * @param {Function} config.format 结果格式化函数，默认(r)=>r
 * @param {boolean} config.origin 是否返回原数据，默认false
 * @param {string} config.errMsg 错误返回的文本，默认'查询失败'
 */
exports.query = async (ctx, sql, config = {}) => {
    const { params, type = 'json', isObj = false, msg = '查询成功', format = (r) => r, origin = false, errMsg = '查询失败' } = config
    ctx.response.type = type
    try {
        const data = await queryFn(sql, params)
        const formatData = format(isObj ? data[0][0] : data[0])
        return origin ? formatData : success(msg, formatData)
    } catch (err) {
        logger.error(err)
        throw (err.message)
    }
}

/**
 * 添加
 * @param {Object} ctx 
 * @param {String} sql sql语句
 * @param {Object} config 配置内容
 * @param {Array} config.params 填充值列表
 * @param {string} config.type? 返回的类型，默认'json'
 * @param {string} config.msg? 成功返回的文本，默认'添加成功'
 * @param {string} config.errMsg? 错误返回的文本，默认'添加失败'
 */
exports.add = async (ctx, sql, config = {}) => {
    const { params, type = 'json', msg = '添加成功', errMsg = '添加失败' } = config
    ctx.response.type = type
    try {
        const data = await queryFn(sql, params)
        return data[0].affectedRows > 0 ? success(msg) : ctx.throw(errMsg)
    } catch (err) {
        logger.error(err)
        throw (errMsg)
    }
}

/**
 * 删除
 * @param {Object} ctx 
 * @param {String} sql sql语句
 * @param {Object} config 配置内容
 * @param {Array} config.params 填充值列表
 * @param {string} config.type 返回的类型，默认'json'
 * @param {string} config.msg 成功返回的文本，默认'删除成功'
 * @param {string} config.errMsg 错误返回的文本，默认'删除失败'
 */
exports.del = async (ctx, sql, config = {}) => {
    let { params, type = 'json', msg = '删除成功', errMsg = '删除失败', ignore = false } = config
    ctx.response.type = type
    try {
        const data = await queryFn(sql, params)
        if(ignore){
           return success(msg)
        }
        else{
            return data[0].affectedRows > 0 ? success(msg) : ctx.throw(errMsg)
        }
    } catch (err) {
        logger.error(err)
        throw (errMsg)
    }
}

/**
 * 更新
 * @param {Object} ctx 
 * @param {String} sql sql语句
 * @param {Object} config 配置内容
 * @param {Array} config.params 填充值列表
 * @param {string} config.type 返回的类型，默认'json'
 * @param {string} config.msg 成功返回的文本，默认'更新成功'
 * @param {string} config.errMsg 错误返回的文本，默认'更新失败'
 */
exports.update = async (ctx, sql, config = {}) => {
    let { params, type = 'json', msg = '更新成功', errMsg = '更新失败' } = config
    ctx.response.type = type
    try {
        const data = await queryFn(sql, params)
        return data[0].affectedRows > 0 ? success(msg) : ctx.throw(errMsg)
    } catch (err) {
        logger.error(err)
        throw (errMsg)
    }
}
