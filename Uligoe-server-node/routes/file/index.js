const Router = require('koa-router')
const fileCtrl = require('../../controller/fileCtrl')
const { jwtVerify } = require('../../config/jwt')
const routes = new Router()

// 上传文件接口
routes.post('/upload', fileCtrl.uploadFile)
// 导入文件到库接口
routes.post('/insert', jwtVerify, fileCtrl.insertFile)
// 获取文件列表接口
routes.get('/', fileCtrl.getFileList)
// 删除文件接口
routes.get('/delete/:id/:filename', jwtVerify, fileCtrl.deleteFile)

module.exports = routes