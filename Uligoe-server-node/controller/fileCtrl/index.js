const process = require('../../config/process')
const { success } = require('../../config/response')
const uuid = require('../../utils/uuid')
const { deleteFile } = require('../../utils/writeFile')

/**
 * 上传文件
 * @param {object} ctx 
 */
exports.uploadFile = async (ctx) => {
    const element = ctx.request.files
    ctx.body = success('上传成功', {
        url: '/upload/' + element.file.newFilename
    })
}

/**
 * 导入文件
 * @param {object} ctx 
 * @param {string} ctx.request.body.id 文件的id，可选
 * @param {string} ctx.request.body.name 文件的标题，必选
 * @param {string} ctx.request.body.url 文件的地址，必选
 * @param {string} ctx.request.body.type 文件的类型，可选
 */
exports.insertFile = async (ctx) => {
    const { id = uuid(), name, url, type = 'img' } = ctx.request.body
    const sql = `insert into file values (?, ?, ?, ?)`
    const config = {
        params: [id, name, url, type],
        msg: '文件导入成功'
    }
    ctx.body = await process.add(ctx, sql, config)
}

/**
 * 获取文件列表
 * @param {object} ctx 
 * @param {object} ctx.query.type 文件类型 
 */
exports.getFileList = async (ctx) => {
    const { type = 'img' } = ctx.query
    const sql = `select * from file where type=?`
    const config = {
        params: [type],
        msg: '获取文件列表成功'
    }
    ctx.body = await process.query(ctx, sql, config)
}

exports.deleteFile = async (ctx) => {
    const { id, filename } = ctx.params
    const sql = 'delete from file where id=?'
    const config = {
        params: [id],
        msg: '删除文件成功'
    }

    await deleteFile(`/upload/${filename}`)
    ctx.body = await process.del(ctx, sql, config)
}