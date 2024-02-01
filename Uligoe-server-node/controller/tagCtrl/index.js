const process = require('../../config/process')
const uuid = require('../../utils/uuid')

/**
 * 获取标签列表
 * @param {object} ctx 
 */
exports.getTagList = async (ctx) => {
    const sql = 'select * from tag'
    ctx.body = await process.query(ctx, sql)
}

/**
 * 上传标签
 * @param {object} ctx context
 * @param {string} ctx.request.body.id 标签的id，可选
 * @param {string} ctx.request.body.title 标签的标题，必选
 * @param {string} ctx.request.body.color 标签的颜色，必选
 */
exports.uploadTag = async (ctx) => {
    const { id = uuid(), title, color } = ctx.request.body
    const sql = 'insert into tag values (?, ?, ?)'
    const config = {
        params: [id, title, color],
        msg: '添加标签成功'
    }
    ctx.body = await process.add(ctx, sql, config)
}

/**
 * 修改标签
 * @param {object} ctx context
 * @param {string} ctx.request.body.id 标签的id，必选
 * @param {string} ctx.request.body.title 标签的标题，必选
 * @param {string} ctx.request.body.color 标签的颜色，必选
 */
exports.editTag = async (ctx) => {
    const { id, title, color } = ctx.request.body
    const sql = 'update tag set title=?, color=? where id=?'
    const config = {
        params: [title, color, id],
        msg: '修改标签成功'
    }
    ctx.body = await process.update(ctx, sql, config)
}

/**
 * 删除标签
 * @param {object} ctx context
 * @param {string} ctx.params.id 标签的id，必选
 */
exports.deleteTag = async (ctx) => {
    const {id} = ctx.params
    const sql = 'delete from tag where id=?'
    const config = {
        params: [id],
        msg: '删除标签成功'
    }
    ctx.body = await process.del(ctx, sql, config)
}