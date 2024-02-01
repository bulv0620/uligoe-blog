const process = require('../../config/process')
const uuid = require('../../utils/uuid')

/**
 * 获取分类列表
 * @param {object} ctx context
 */
exports.getCategoryList = async (ctx) => {
    const sql = 'select * from category'
    ctx.body = await process.query(ctx, sql)
}

/**
 * 上传分类
 * @param {object} ctx context
 * @param {string} ctx.request.body.id 分类的id，可选
 * @param {string} ctx.request.body.title 分类的标题，必选
 * @param {string} ctx.request.body.coverImg 分类的封面图，必选
 * @param {string} ctx.request.body.description 分类的描述，可选
 */
exports.uploadCategory = async (ctx) => {
    const { id = uuid(), title, coverImg, description = '' } = ctx.request.body
    const sql = 'insert into category values (?, ?, ?, ?)'
    const config = {
        params: [id, title, coverImg, description],
        msg: '添加分类成功'
    }
    ctx.body = await process.add(ctx, sql, config)
}

/**
 * 修改分类
 * @param {object} ctx context
 * @param {string} ctx.request.body.id 分类的id，必选
 * @param {string} ctx.request.body.title 分类的标题，必选
 * @param {string} ctx.request.body.coverImg 分类的封面图，必选
 * @param {string} ctx.request.body.description 分类的描述，可选
 */
exports.editCategory = async (ctx) => {
    const { id, title, coverImg, description = '' } = ctx.request.body
    const sql = 'update category set title=?, cover_img=?, description=? where id=?'
    const config = {
        params: [title, coverImg, description, id],
        msg: '修改分类成功'
    }
    ctx.body = await process.update(ctx, sql, config)
}

/**
 * 删除分类
 * @param {object} ctx context
 * @param {string} ctx.params.id 分类的id，必选
 */
exports.deleteCategory = async (ctx) => {
    const {id} = ctx.params
    const sql = 'delete from category where id=?'
    const config ={
        params: [id],
        msg: '删除分类成功'
    }
    ctx.body = await process.del(ctx, sql, config)
}