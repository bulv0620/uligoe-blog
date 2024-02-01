const Router = require('koa-router')
const { jwtVerify } = require('../../config/jwt')
const linkCtrl = require('../../controller/linkCtrl')

const routes = new Router()

routes.get('/class', jwtVerify, linkCtrl.getLinkClassList)
routes.get('/list/:classId', jwtVerify, linkCtrl.getLinkListByClass)
routes.get('/list', linkCtrl.getLinkList)
routes.post('/add/class', jwtVerify, linkCtrl.uploadLinkClass)
routes.post('/add', jwtVerify, linkCtrl.uploadLink)
routes.get('/delete/class/:id', jwtVerify, linkCtrl.deleteLinkClass)
routes.get('/delete/:id', jwtVerify, linkCtrl.deleteLink)
routes.post('/pos', jwtVerify, linkCtrl.updateLinkClassPos)
routes.post('/update/class', jwtVerify, linkCtrl.updateLinkClass)
routes.post('/update', jwtVerify, linkCtrl.updateLink)

module.exports = routes