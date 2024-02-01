const process = require('../../config/process')
const uuid = require('../../utils/uuid')
const { jwtVerify } = require('../../config/jwt')
const { success } = require('../../config/response')
const md5 = require('js-md5')

/**
 * 上传评论
 * @param {object} ctx context
 * @param {string} ctx.request.body.id 评论的id，可选
 * @param {string} ctx.request.body.status 评论的状态，可选，默认为'公开'
 * @param {string} ctx.request.body.content 评论的内容，必选
 * @param {string} ctx.request.body.user 评论的用户名，必选
 * @param {string} ctx.request.body.email 评论的用户email，必选
 * @param {string} ctx.request.body.articleId 评论的文章id，可选，没有则是站点评论
 * @param {string} ctx.request.body.replyTo 评论回复的评论id，可选
 */
exports.uploadComment = async (ctx) => {
    const { id = uuid(), status = '公开', content, user, email, articleId = null, replyTo = null } = ctx.request.body
    const sql = `insert into comment values (?, ?, ?, ?, ?, ?, now(), ?, ?)`
    const avatar = 'https://cravatar.cn/avatar/' + md5(email)
    const config = {
        params: [id, status, content, user, email, articleId, replyTo, avatar],
        msg: '发布评论成功',
    }
    ctx.body = await process.add(ctx, sql, config)
}

/**
 * 删除评论
 * @param {object} ctx context 
 * @param {string} ctx.params.id 删除评论的id
 */
exports.deleteComment = async (ctx) => {
    const { id } = ctx.params
    const sql = `delete from comment where id=?`
    const config = {
        params: [id],
        msg: '删除评论成功',
        errMsg: '评论不存在'
    }
    ctx.body = await process.del(ctx, sql, config)
}

/**
 * 获取站点评论列表
 * @param {object} ctx 
 */
exports.getAllStationComment = async (ctx) => {
    const sql = `select * from comment where status = '公开' and article_id is null order by publish_time desc`
    const config = {
        params: [],
        origin: true
    }

    ctx.body = await process.query(ctx, sql, config)
}

/**
 * 获取评论列表
 * @param {object} ctx context
 * @param {string} ctx.request.query.pageSize 评论的页大小，可选
 * @param {string} ctx.request.query.pageNo 评论的页码，可选
 * @param {string} ctx.request.query.type 评论的类型，可选
 * @param {string} ctx.request.query.articleId 评论的文章id，可选
 * @param {string} ctx.request.query.keyword 评论的关键词，可选
 * @param {string} ctx.request.query.replyTo 评论回复的评论id，可选
 */
exports.getCommentList = async (ctx) => {
    const { pageSize = 10, pageNo = 1, type = 'article', articleId = null, keyword = '', replyTo = null } = ctx.request.body

    // 拼接查询条件的参数列表
    const conditionParams = []
    // 拼接查询的sql语句
    let queryConditions = ''

    // 请求参数中存在articleId 
    if (articleId) {
        queryConditions += ' and article_id = ? '
        conditionParams.push(articleId)
    }

    // 请求参数中存在replyTo
    // if (replyTo) {
    //     queryConditions += ' and reply_to = ? '
    //     conditionParams.push(replyTo)
    // }
    // else{
    //     queryConditions += ' and reply_to is NULL '
    // }

    // 携带有效token，可以访问私密评论
    try {
        await jwtVerify(ctx)
    } catch (e) {
        queryConditions += ' and status = ? '
        conditionParams.push('公开')
    }

    const sql = `select *# from comment c1 where content like ? and article_id is ${type === 'article' ? 'not' : ''} NULL ${queryConditions} order by publish_time desc limit ?,?`

    const config = {
        params: [`%${keyword}%`, ...conditionParams, (((pageNo) - 1) * pageSize) + '', pageSize + ''],
        origin: true
    }

    // 评论列表
    const list = await process.query(ctx, sql.replace('#', ', (select count(0) from comment where reply_to = c1.id) as reply_count'), config)
    // 评论总数 用于分页
    const total = await process.query(ctx, sql.replace('*#', 'count(0) as count').replace(' limit ?,?', ''), { params: [config.params[0]], origin: true, isObj: true })
    ctx.body = success('获取评论列表成功', {
        list,
        total: total.count,
        pageSize,
        pageNo
    })
}
