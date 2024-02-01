const Koa = require('koa')
const cors = require('@koa/cors')
const koaBody = require('koa-body');
const { logger, accessLogger } = require('./logger');
const Router = require('koa-router')
const serve = require('koa-static')
const routes = require('./routes')
const routes_views = require('./routes_views')
const path = require('path')
const { handleError } = require('./config/response')
const views = require('koa-views');

const port = 3001
const app = new Koa()
const resource = serve(__dirname + '/resource/');
const ejs = serve(__dirname + '/ejs/')


// 配置cors跨域
app.use(cors())
// 配置body解析
app.use(koaBody({
    multipart: true, // 支持文件上传
    // encoding: 'gzip',
    formidable: {
        uploadDir: path.join(__dirname, 'resource/upload/'), // 设置文件上传目录
        keepExtensions: true,    // 保持文件的后缀
        maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
    },
}))
// 配置日志
app.use(accessLogger())
// 配置静态资源地址
app.use(resource)
app.use(ejs)
// 配置错误的返回
app.use(handleError)

// 配置views
const router = new Router()
app.use(views('ejs/views', { map: { html: 'ejs'} }));
router.use(routes_views.routes(), routes_views.allowedMethods())

// 配置路由
router.use('/api', routes.routes(), routes.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())

// 监听全局错误 输出日志
app.on('Error', err => {
    console.log(err.message)
    logger.error(err)
})
app.on('error', (err) => {
    console.log(err.message)
    logger.error(err)
})

app.listen(port, () => {
    console.log(`server on ${port}`)
})