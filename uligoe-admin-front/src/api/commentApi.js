import {request} from './request';

/**
 * 获取评论列表
 * @param {string} params.pageSize 页大小
 * @param {string} params.pageNo 页码
 * @param {string} params.type 类型 [article | station]
 * @param {string} params.articleId 文章id
 * @param {string} params.keyword 关键词
 * @param {string} params.replyTo 回复评论
 * @returns 
 */
export const reqGetCommentList = (params) => request.post('/comment', params);

/**
 * 删除评论
 * @param {string} id 评论id
 * @returns 
 */
export const reqDeleteComment = (id) => request.get(`/comment/delete/${id}`);