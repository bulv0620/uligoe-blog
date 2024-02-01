import {request} from './request'

export const reqGetTagList = () => request.get('/tag');

/**
 * 上传标签
 * @param {string} params.id 标签id 
 * @param {string} params.title 标签名字
 * @param {string} params.color 标签颜色
 * @returns 
 */
export const reqUploadTag = (params) => request.post('/tag/upload', params);

/**
 * 修改标签
 * @param {string} params.id 标签id 
 * @param {string} params.title 标签名字
 * @param {string} params.color 标签颜色
 * @returns 
 */
export const reqEditTag = (params) => request.post('/tag/edit', params);

/**
 * 删除标签
 * @param {string} id 标签id
 * @returns 
 */
export const reqDeleteTag = (id) => request.get(`/tag/delete/${id}`);