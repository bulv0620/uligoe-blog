const Router = require('koa-router')
const articleCtrl = require('../../controller/articleCtrl')
const { jwtVerify } = require('../../config/jwt')

const routes = new Router()

// 发布文章接口
routes.post('/upload', jwtVerify, articleCtrl.uploadArticle)
// 修改文章接口
routes.post('/edit', jwtVerify, articleCtrl.editArticle)
// 回收文章接口
routes.get('/recycle/:id', jwtVerify, articleCtrl.recycleArticle)
// 删除文章接口
routes.get('/delete/:id', jwtVerify, articleCtrl.deleteArticle)
// 获取文章列表不分页
routes.post('/', articleCtrl.getArticleList)
// 获取文章内容
routes.get('/content/:id', articleCtrl.getArticleById)

module.exports = routes