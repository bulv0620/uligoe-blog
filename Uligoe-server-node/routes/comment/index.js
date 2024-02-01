const Router = require('koa-router')
const commentCtrl = require('../../controller/commentCtrl')
const { jwtVerify } = require('../../config/jwt')
const routes = new Router()

routes.post('/upload', commentCtrl.uploadComment)
routes.get('/delete/:id', jwtVerify, commentCtrl.deleteComment)
routes.post('/', commentCtrl.getCommentList)

module.exports = routes