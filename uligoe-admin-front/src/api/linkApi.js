import { request } from "./request";

/**
 * 获取类别列表
 * @returns 
 */
export const reqGetLinkClassList = () => request.get('/link/class');

/**
 * 根据类别id获得连接列表
 * @param {*} classId 类别id
 * @returns 
 */
export const reqGetLinkListByClassId = (classId) => request.get(`/link/list/${classId}`);

/**
 * 上传新类别
 * @param {*} title 类别标题
 * @returns 
 */
export const reqUploadLinkClass = (title) => request.post('/link/add/class', {title});

/**
 * 上传链接
 * @param {*} params.name 链接名称
 * @param {*} params.url 链接地址
 * @param {*} params.classId 链接id
 * @returns 
 */
export const reqUploadLink = (params) => request.post('/link/add', params);

/**
 * 删除类别
 * @param {*} id 类别id
 * @returns 
 */
export const reqDeleteLinkClass = (id) => request.get(`/link/delete/class/${id}`);

/**
 * 删除链接
 * @param {*} id 连接id
 * @returns 
 */
export const reqDeleteLink = (id) => request.get(`/link/delete/${id}`);

/**
 * 更新类别顺序
 * @param {*} list 更新后的数组
 * @returns 
 */
export const reqUpdateClassPos = (list) => request.post('/link/pos', {list});

/**
 * 更新链接类别信息
 * @param {*} params.id 类别id
 * @param {*} params.title 类别名
 * @returns 
 */
export const reqUpdateLinkClass = (params) => request.post('/link/update/class', params);

/**
 * 更新链接信息
 * @param {*} params.id 链接id
 * @param {*} params.name 类别名
 * @param {*} params.url 类别名
 * @returns 
 */
export const reqUpdateLink = (params) => request.post('/link/update', params);