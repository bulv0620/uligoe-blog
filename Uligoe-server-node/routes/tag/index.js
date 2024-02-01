const Router = require('koa-router')
const tagCtrl = require('../../controller/tagCtrl')
const { jwtVerify } = require('../../config/jwt')

const routes = new Router()

routes.get('/', tagCtrl.getTagList)
routes.post('/upload', jwtVerify, tagCtrl.uploadTag)
routes.post('/edit', jwtVerify, tagCtrl.editTag)
routes.get('/delete/:id', jwtVerify, tagCtrl.deleteTag)

module.exports = routes