const process = require('../../config/process')
const uuid = require('../../utils/uuid')

exports.getLinkClassList = async (ctx) => {
    const sql = `select * from link_class order by pos asc`
    const config = {
        msg: '获取链接类别列表成功'
    }
    ctx.body = await process.query(ctx, sql, config)
}

exports.getLinkListByClass = async (ctx) => {
    const { classId } = ctx.params
    const sql = `select * from link where class_id = ? order by time desc`
    const config = {
        params: [classId],
        msg: '获取指定链接列表成功'
    }
    ctx.body = await process.query(ctx, sql, config)
}

exports.getLinkList = async (ctx) => {
    const classSql = `select * from link_class order by pos asc`
    const classConfig = {
        origin: true
    }
    const classList = await process.query(ctx, classSql, classConfig)
    const linkSql = `select id, name, url from link where class_id = ? order by time desc`
    const linkQuery = []
    classList.forEach(item => {
        const linkConfig = {
            params: [item.id],
            origin: true
        }
        linkQuery.push(process.query(ctx, linkSql, linkConfig))
    })

    const linkList = await Promise.all(linkQuery)

    classList.map((item,index) => {
        item.list = linkList[index]
    })

    ctx.body = classList
}

exports.uploadLinkClass = async (ctx) => {
    const { id = uuid(), title } = ctx.request.body
    const sql = `insert into link_class values(?,?,?)`
    const curMaxPos = (await process.query(ctx, 'SELECT MAX(pos) as max_pos FROM link_class', { isObj: true, origin: true })).max_pos
    const config = {
        params: [id, title, curMaxPos + 1],
        msg: '添加类别成功'
    }
    ctx.body = await process.add(ctx, sql, config)
}

exports.uploadLink = async (ctx) => {
    const { id = uuid(), name, url, classId } = ctx.request.body
    const sql = `insert into link values(?, ?, ?, ?, now())`
    const config = {
        params: [id, name, url, classId],
        msg: '添加链接成功'
    }
    ctx.body = await process.add(ctx, sql, config)
}

exports.deleteLinkClass = async (ctx) => {
    const { id } = ctx.params
    const linkSql = `delete from link where class_id=?`
    const linkClassSql = `delete from link_class where id=?`
    const config = {
        params: [id],
        msg: '删除类别成功',
    }
    await process.del(ctx, linkSql, {...config, ignore: true})
    ctx.body = await process.del(ctx, linkClassSql, config)
}

exports.deleteLink = async (ctx) => {
    const { id } = ctx.params
    const sql = `delete from link where id=?`
    const config = {
        params: [id],
        msg: '删除链接成功'
    }
    ctx.body = await process.del(ctx, sql, config)
}

exports.updateLinkClassPos = async (ctx) => {
    const { list } = ctx.request.body

    const sql = 'update link_class set pos = ? where id = ?'
    const queryList = []
    list.forEach((item, index) => {
        const { id } = item;
        const config = {
            params: [index + 1, id],
        }
        queryList.push(process.update(ctx, sql, config))
    })

    ctx.body = (await Promise.all(queryList))[0]
}

exports.updateLinkClass = async (ctx) => {
    const {id, title} = ctx.request.body
    const sql = 'update link_class set title=? where id=?'

    const config = {
        params: [title, id],
        msg: '更新类别成功'
    }

    ctx.body = await process.update(ctx, sql, config)
}

exports.updateLink = async (ctx) => {
    const {id, name, url} = ctx.request.body
    const sql = 'update link set name=?, url=? where id=?'

    const config = {
        params: [name, url, id],
        msg: '更新链接信息成功'
    }

    ctx.body = await process.update(ctx, sql, config)
}