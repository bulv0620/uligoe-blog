const fs = require('fs');

exports.writeFile = (fileName, data) => new Promise((resolve, reject) => {
    fs.writeFile(`${__dirname}/../resource/article/${fileName}`, data, err => {
        if (err) {
            reject('文件保存失败')
        }
        resolve()
    })
})


exports.deleteFile = (fileName) => new Promise((resolve, reject) => {
    fs.unlink(`${__dirname}/../resource${fileName}`, err => {
        if (err) {
            reject('文件删除失败')
        }
        resolve()
    })
})

exports.readFile = (fileName) => new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/../resource/article/${fileName}`, (err, data) => {
        if (err) {
            reject('文件读取失败')
        }
        resolve(data)
    })
})