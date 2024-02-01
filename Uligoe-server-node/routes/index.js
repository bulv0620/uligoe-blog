const Router = require('koa-router')
const fs = require('fs')
const {toLine} = require('../utils/formatUtil')

const routes = new Router()
const routeList = fs.readdirSync('./routes').filter(item => item != 'index.js')
routeList.forEach(item => {
    let routeObj = require('./' + item)
    routes.use('/' + toLine(item), routeObj.routes(), routeObj.allowedMethods())
})

module.exports = routes