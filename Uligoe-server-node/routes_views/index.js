const Router = require('koa-router')
const pageCtrl = require('./service')

const routes = new Router()

routes.get('/', pageCtrl.homePage)

routes.get('/articles', pageCtrl.articlesPage)

routes.get('/guestbook', pageCtrl.guestbookPage)

routes.get('/links', pageCtrl.linksPage)

routes.get('/about', pageCtrl.aboutPage)

routes.get('/articles/:id', pageCtrl.viewArticlePage)

module.exports = routes