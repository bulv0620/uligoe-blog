const Router = require('koa-router')
const categoryCtrl = require('../../controller/categoryCtrl')
const { jwtVerify } = require('../../config/jwt')

const routes = new Router()

routes.get('/', categoryCtrl.getCategoryList)
routes.post('/upload', jwtVerify, categoryCtrl.uploadCategory)
routes.post('/edit', jwtVerify, categoryCtrl.editCategory)
routes.get('/delete/:id', jwtVerify, categoryCtrl.deleteCategory)

module.exports = routes