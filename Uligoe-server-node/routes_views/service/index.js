const adminCtrl = require('../../controller/adminCtrl')
const articleCtrl = require('../../controller/articleCtrl')
const categoryCtrl = require('../../controller/categoryCtrl')
const tagCtrl = require('../../controller/tagCtrl')
const commentCtrl = require('../../controller/commentCtrl')
const linkCtrl = require('../../controller/linkCtrl')

exports.homePage = async (ctx) => {
    await adminCtrl.getAdminInfo(ctx)
    const res = ctx.body.data
    await ctx.render('home', {
        title: `Welcome to ${res.name}'s blog`,
        name: res.name
    })
}

exports.articlesPage = async (ctx) => {
    await articleCtrl.getArticleListByPage(ctx)
    const articleList = ctx.body.list
    const total = ctx.body.total
    await categoryCtrl.getCategoryList(ctx)
    const categoryList = ctx.body.data
    await tagCtrl.getTagList(ctx)
    const tagList = ctx.body.data

    const { pageNo = 1, pageSize = 8, keyword = '' } = ctx.query

    await ctx.render('articles', {
        articleList,
        total,
        categoryList,
        tagList,
        pageNo,
        pageSize,
        keyword
    })
}

exports.guestbookPage = async (ctx) => {
    await commentCtrl.getAllStationComment(ctx)
    const commentList = ctx.body

    await ctx.render('guestbook', {
        commentList
    })
}

exports.linksPage = async (ctx) => {
    await linkCtrl.getLinkList(ctx);
    const linkList = ctx.body
    await ctx.render('links', { linkList })
}

exports.aboutPage = async (ctx) => {
    await adminCtrl.getAdminInfo(ctx)
    const res = ctx.body.data
    await ctx.render('about', {
        name: res.name,
        birthday: res.birthday,
        address: res.address,
        github: res.github,
        wechat: res.wechat,
        email: res.email,
        work: res.work,
        description: res.description
    })
}

exports.viewArticlePage = async (ctx) => {
    await ctx.render('articleview', {})
}

