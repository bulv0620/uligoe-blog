import {request} from './request'

export const reqGetCategoryList = () => request.get('/category');

/**
 * 添加分类
 * @param {string} params.id
 * @param {string} params.title
 * @param {string} params.coverImg
 * @param {string} params.description
 * @returns 
 */
export const reqUploadCategory = (params) => request.post('/category/upload', params);

/**
 * 修改分类
 * @param {string} params.id
 * @param {string} params.title
 * @param {string} params.coverImg
 * @param {string} params.description
 * @returns 
 */
export const reqEditCategory = (params) => request.post('/category/edit', params);

/**
 * 删除分类
 * @param {string} id 分类id
 * @returns 
 */
export const reqDeleteCategory = (id) => request.get(`/category/delete/${id}`);