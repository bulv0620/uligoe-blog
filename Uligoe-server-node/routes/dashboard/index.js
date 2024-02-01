const Router = require('koa-router')
const { jwtVerify } = require('../../config/jwt')
const { getStatistics } = require('../../controller/dashboardCtrl')
const routes = new Router()

routes.get('/', jwtVerify, getStatistics)

module.exports = routes