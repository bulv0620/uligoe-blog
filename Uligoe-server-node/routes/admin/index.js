const Router = require('koa-router')
const adminCtrl = require('../../controller/adminCtrl')
const { jwtVerify } = require('../../config/jwt')

const routes = new Router()

// 管理员登录接口
routes.post('/login', adminCtrl.login)
// 管理员获取信息接口
routes.get('/info', jwtVerify, adminCtrl.getAdminInfo)
// 管理员修改信息接口
routes.post('/edit', jwtVerify, adminCtrl.editAdminInfo)
// 管理员修改密码接口
routes.post('/pwd', jwtVerify, adminCtrl.editAdminPwd)

module.exports = routes