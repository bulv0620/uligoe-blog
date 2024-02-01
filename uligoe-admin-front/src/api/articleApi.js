import {request} from './request'

/**
 * 上传文章
 * @param {string} params.id id
 * @param {string} params.status 状态
 * @param {string} params.title 标题
 * @param {string} params.content 内容
 * @param {string} params.belongTo 分类id
 * @param {Array} params.tags 标签列表
 * @param {string} params.bgImg 背景图
 * @returns Promise
 */
export const reqUploadArticle = (params) => request.post('/article/upload', params);

/**
 * 修改文章
 * @param {string} params.id id
 * @param {string} params.status 状态
 * @param {string} params.title 标题
 * @param {string} params.content 内容
 * @param {string} params.belongTo 分类id
 * @param {Array} params.tags 标签列表
 * @param {string} params.bgImg 背景图
 * @returns Promise
 */
export const reqEditArticle = (params) => request.post('/article/edit', params);

/**
 * 回收文章
 * @param {string} id 文章id
 * @param {string} mode 恢复或删除
 * @returns Promise
 */
export const reqRecycleArticle = (id, mode='delete') => request.get(`/article/recycle/${id}?mode=${mode}`);

/**
 * 删除文章
 * @param {string} id 文章id
 * @returns Promise
 */
export const reqDeleteArticle = (id) => request.get(`/article/delete/${id}`);

/**
 * 获取文章列表
 * @param {string} params.keyword 关键词
 * @param {string} params.categoryId 分类id
 * @param {string} params.tagId 标签id
 * @param {boolean} params.isDeleted 是否删除
 * @returns Promise
 */
export const reqGetArticleList = (params) => request.post('/article', params);