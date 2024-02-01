const process = require('../../config/process')
const { jwtSign, jwtUnsign } = require('../../config/jwt')
const sha256 = require('sha256')

/**
 * 管理员登录
 * @param {object} ctx context
 * @param {string} ctx.request.body.username 登录账号
 * @param {string} ctx.request.body.password 登录密码
 */
exports.login = async (ctx) => {
    const { username, password } = ctx.request.body
    const sql = `select id, username from admin where username=? and password=?`
    const config = {
        params: [username, sha256(password)],
        msg: '登录成功',
        errMsg: '账号或密码错误',
        isObj: true,
        format: (r) => {
            if (!r) {
                ctx.throw('账号或密码错误')
            }
            const token = 'Bearer ' + jwtSign(r)
            return { token }
        }
    }
    ctx.body = await process.query(ctx, sql, config)
}

/**
 * 获取管理员信息,解析token获得id
 * @param {object} ctx context
 */
exports.getAdminInfo = async (ctx) => {
    const sql = `select * from admin`
    const config = {
        msg: '获取信息成功',
        isObj: true,
        format: data => {
            delete data.password
            return data
        }
    }
    ctx.body = await process.query(ctx, sql, config)
}

/**
 * 修改管理员信息,解析token获得id
 * @param {object} ctx context
 * @param {string} ctx.request.body.name 修改name，必选
 * @param {string} ctx.request.body.birthday 修改birthday，必选
 * @param {string} ctx.request.body.address 修改address，必选
 * @param {string} ctx.request.body.github 修改github，必选
 * @param {string} ctx.request.body.wechat 修改wechat，必选
 * @param {string} ctx.request.body.email 修改Email，必选
 * @param {string} ctx.request.body.work 修改work，必选
 * @param {string} ctx.request.body.description 修改描述信息，可选 
 */
exports.editAdminInfo = async (ctx) => {
    const { user: { id } } = ctx.state
    const { name, birthday, address, github, wechat, email, work, description = '' } = ctx.request.body
    const sql = `update admin set name=?, birthday=?, address=?, github=?, wechat=?, email=?, work=?, description=? where id=?`
    const config = {
        params: [name, birthday, address, github, wechat, email, work, description, id],
        msg: '修改信息成功'
    }
    ctx.body = await process.update(ctx, sql, config)
}

/**
 * 修改管理员密码，解析token获得id
 * @param {object} ctx context
 * @param {string} ctx.request.body.oldPwd 旧密码
 * @param {string} ctx.request.body.newPwd 新密码
 */
exports.editAdminPwd = async (ctx) => {
    const { user: { id } } = ctx.state
    const { oldPwd, newPwd } = ctx.request.body
    const sql = `update admin set password=? where id=? and password=?`
    const config = {
        params: [sha256(newPwd), id, sha256(oldPwd)],
        msg: '修改密码成功',
        errMsg: '旧密码错误'
    }
    ctx.body = await process.update(ctx, sql, config)
    jwtUnsign(ctx)
}

