const jwt = require('jsonwebtoken')
const {JWT_DEFAULT_SECRET} = require('./keys');

const DEFAULT_SECRET = JWT_DEFAULT_SECRET
const DEFAULT_CONFIG = {
    expiresIn: '1h'
}
const SERVER_TOKEN_LIST = {}

exports.jwtSign = (data) => {
    const token = jwt.sign(data, DEFAULT_SECRET, DEFAULT_CONFIG)
    SERVER_TOKEN_LIST[data.username] = token
    return token
}

exports.jwtVerify = async (ctx, next = async () => { }) => {
    const { authorization = '' } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    try {
        const user = jwt.verify(token, DEFAULT_SECRET)
        ctx.state.user = user
        if(SERVER_TOKEN_LIST[user.username] !== token){
            throw '没有对应的权限'
        }
    } catch (e) {
        ctx.throw(401, '没有对应的权限')
    }
    await next()
}

exports.jwtUnsign = (ctx) => {
   delete SERVER_TOKEN_LIST[ctx.state.user.username]
}