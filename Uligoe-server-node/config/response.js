const STATUS = {
    SUCCESS: 1,
    ERR: 0,
    REPEAT: 2,
}

const success = (msg, data = {}) => {
    return {
        code: STATUS.SUCCESS,
        message: msg,
        data: data
    }
}

const error = (msg) => {
    return {
        code: STATUS.ERR,
        message: msg
    }
}

const repeat = (msg) => {
    return {
        code: STATUS.REPEAT,
        message: msg
    }
}

// 全局错误返回处理
const handleError = async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status ? err.status : 200
        ctx.body = error(typeof err === 'string' ? err : err.message)
    }
}

module.exports = {
    STATUS, success, error, repeat, handleError
}