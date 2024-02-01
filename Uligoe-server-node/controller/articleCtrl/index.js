const process = require('../../config/process')
const uuid = require('../../utils/uuid')
const { writeFile, deleteFile, readFile } = require('../../utils/writeFile')
const { jwtVerify } = require('../../config/jwt')
const { success } = require('../../config/response')

/**
 * 上传文章
 * @param {object} ctx context
 * @param {string} ctx.request.body.id 上传文章的id，可选
 * @param {string} ctx.request.body.status 上传的文章的状态，可选，默认'公开'
 * @param {string} ctx.request.body.title 上传的文章的标题，必选
 * @param {string} ctx.request.body.content 上传的文章的内容，必选
 * @param {string} ctx.request.body.belongTo 上传的文章从属的分类，必选
 * @param {Array} ctx.request.body.tags 上传的文章的标签，可选
 */
exports.uploadArticle = async (ctx) => {
    const { id = uuid(), status = "公开", title, description, content, belongTo, tags = [], bgImg } = ctx.request.body
    const sql = `insert into article values (?, ?, ?, ?, ?, now(), ?, 0, ?)`

    // 标签写入数据库
    await addArticleTag(ctx, id, tags)

    // 文章内容写入文件
    await writeFile(`${id}.md`, content)

    const config = {
        params: [id, status, title, description, `/article/${id}.md`, belongTo, bgImg],
        msg: '上传文章成功'
    }
    ctx.body = await process.add(ctx, sql, config)
}

/**
 * 修改文章
 * @param {object} ctx context
 * @param {string} ctx.request.body.id 修改文章的id，必选
 * @param {string} ctx.request.body.status 修改文章的状态，必选
 * @param {string} ctx.request.body.title 修改文章的标题，必选
 * @param {string} ctx.request.body.content 修改文章的内容，必选
 * @param {string} ctx.request.body.belongTo 修改文章从属的分类，必选
 * @param {Array} ctx.request.body.Tags 修改文章的标签，可选
 */
exports.editArticle = async (ctx) => {
    const { id, status, title, description, content, belongTo, tags = [], bgImg } = ctx.request.body
    const sql = `update article set status=?, title=?, description=?,belong_to=?, bg_img=? where id=?`

    // 删除原有的标签
    try {
        await process.del(ctx, 'delete from article_tag where article_id = ?', { params: [id] })
    } catch (error) { }

    // 新的标签写入数据库
    await addArticleTag(ctx, id, tags)

    // 文章内容写入文件
    await writeFile(`${id}.md`, content)

    const config = {
        params: [status, title, description, belongTo, bgImg, id],
        msg: '修改文章成功'
    }
    ctx.body = await process.update(ctx, sql, config)
}

/**
 * 根据id查文章
 * @param {object} ctx 
 * @param {string} ctx.params.id 文章id
 */
exports.getArticleById = async (ctx) => {
    const { id } = ctx.params
    const sql = `select * from article where id = ?`
    const config = {
        params: [id],
        isObj: true,
        origin: true
    }
    const info = await process.query(ctx, sql, config)

    // 访问量计数
    const count_num = await process.query(ctx, 'SELECT count_num FROM visit_count WHERE target = ? AND DATE = CURDATE()', { params: [id], isObj: true, origin: true })
    if (count_num) {
        await process.update(ctx, 'update visit_count set count_num = count_num + 1 where target = ? and date = CURDATE()', { params: [id] })
    } else {
        await process.add(ctx, 'insert into visit_count values(null, CURDATE(), 1, ?)', { params: [id] })
    }

    const content = await readFile(id + '.md');
    ctx.body = success('获取文章内容成功', {
        info,
        content: content.toString()
    })
}

/**
 * 回收(恢复)文章
 * @param {object} ctx context
 * @param {string} ctx.params.id 回收(恢复)的文章的id
 * @param {string} ctx.query.mode 模式:delete(回收)|recover(恢复)
 */
exports.recycleArticle = async (ctx) => {
    const { id } = ctx.params
    const { mode } = ctx.query
    const sql = 'update article set is_deleted=? where id=?'
    const config = {
        params: [mode === 'delete' ? true : false, id],
        msg: mode === 'delete' ? '回收文章成功' : '恢复文章成功'
    }
    ctx.body = await process.update(ctx, sql, config)
}

/**
 * 删除文章
 * @param {object} ctx context
 * @param {string} ctx.params.id 删除文章的id
 */
exports.deleteArticle = async (ctx) => {
    const { id } = ctx.params
    const sql = 'delete from article where id=?'
    const config = {
        params: [id],
        msg: '删除文章成功'
    }

    await process.del(ctx, 'delete from article_tag where article_id = ?', { params: [id] })
    ctx.body = await process.del(ctx, sql, config)

    // 删除文件
    await deleteFile(`/article/${id}.md`)
}

/**
 * 获取文章列表不分页，带详细标签等
 * @param {object} ctx context
 * @param {string} ctx.request.body.keyword 获取文章的关键词，可选
 * @param {string} ctx.request.body.categoryId 获取文章的从属分类id，可选
 * @param {string} ctx.request.body.tagId 获取文章的标签id，可选
 * @param {boolean} ctx.request.body.isDeleted 获取文章是否删除，可选
 */
exports.getArticleList = async (ctx) => {
    const { keyword = '', categoryId = null, tagId = null, isDeleted = false } = ctx.request.body
    let sql = `select a.*, 
	                    b.tag_id,
	                    c.title AS tag_title,
	                    c.color AS tag_color,
	                    d.title AS category,
	                    (select count(0) from comment where article_id = a.id) as comment_count, 
	                    (select sum(count_num) from visit_count where target = a.id) as visit_count 
                from article a, article_tag b, tag c, category d 
                
                where a.id = b.article_id 
	                    and b.tag_id = c.id 
	                    and d.id = a.belong_to 
                        and a.title like ? `
    const params = [`%${keyword}%`]

    // 管理员权限token，则可以访问[status: 私密]，并且[id_deleted: true(回收的内容)]需要管理员权限
    try {
        await jwtVerify(ctx)
        sql += ' AND a.is_deleted = ? '
        params.push(isDeleted)
    } catch (e) {
        sql += ' AND a.status = ? AND a.is_deleted = ? '
        params.push('公开', false)
    }

    // 请求参数中存在categoryId则可以筛选[belong_to: categoryId]
    if (categoryId) {
        sql += ' AND a.belong_to = ? '
        params.push(categoryId)
    }

    // 请求参数中存在tagId则可以筛选[tag_id: tagId]
    if (tagId) {
        sql += ' AND b.tag_id = ? '
        params.push(tagId)
    }

    const config = {
        params,
        msg: '获取文章列表成功',
        format: (r) => {
            // 格式化结果,实现去重、tag_list列表
            const list = {}
            r.forEach(item => {
                // 通过类似字典的方式,键不存在则新增键，然后将tag数据push到tag_list列表
                if (!list[item.id]) {
                    list[item.id] = {
                        id: item.id,
                        status: item.status,
                        title: item.title,
                        description: item.description,
                        bg_img: item.bg_img,
                        belong_to: item.belong_to,
                        content_url: item.content_url,
                        publish_time: item.publish_time,
                        visit_count: item.visit_count,
                        comment_count: item.comment_count,
                        tag_list: [],
                        category: item.category
                    }
                }
                list[item.id].tag_list.push({
                    id: item.tag_id,
                    title: item.tag_title,
                    color: item.tag_color
                })
            })
            // 返回list对象的值列表即可
            return Object.values(list)
        }
    }
    ctx.body = await process.query(ctx, sql + ' order by a.publish_time desc', config)
}

/**
 * 获取文章列表分页
 * @param {object} ctx context
 * @param {string} ctx.query.keyword 获取文章的关键词，可选
 * @param {string} ctx.query.pageSize 获取文章的页大小，可选
 * @param {string} ctx.query.pageNo 获取文章的页编号，可选
 */
exports.getArticleListByPage = async (ctx) => {
    const { keyword = '', pageNo = '1', pageSize = '8' } = ctx.query
    const sql = 'SELECT *, (SELECT IFNULL(SUM(count_num), 0) FROM visit_count WHERE target = a.id) AS visit_count, (SELECT title FROM category WHERE id = a.belong_to) AS category FROM article a WHERE (title LIKE ? OR description LIKE ?) and status="公开" and is_deleted=0 ORDER BY publish_time DESC LIMIT ?,?'
    const config = {
        params: [`%${keyword}%`, `%${keyword}%`, ((pageNo - 1) * pageSize) + '', pageSize + ''],
        origin: true
    }
    const list = await process.query(ctx, sql, config)

    const sql2 = `select count(0) as total from article where title LIKE ? OR description LIKE ? ORDER BY publish_time DESC`
    const config2 = {
        params: [`%${keyword}%`, `%${keyword}%`],
        origin: true,
        isObj: true
    }
    const total = await process.query(ctx, sql2, config2)
    ctx.body = {
        list, total: total.total
    }
}

/**
 * 添加tags到数据库方法
 * @param {object} ctx context
 * @param {string} id 文章的id
 * @param {Array} tags 文章的tags列表
 */
async function addArticleTag(ctx, id, tags) {
    if (tags.length > 0) {
        const paramsList = []
        let addTagSql = 'insert into article_tag(article_id, tag_id) values '
        tags.forEach((item, index) => {
            addTagSql += "(?, ?)" + (index === tags.length - 1 ? '' : ',')
            paramsList.push(id, item)
        })
        await process.add(ctx, addTagSql, { params: paramsList })
    }
}