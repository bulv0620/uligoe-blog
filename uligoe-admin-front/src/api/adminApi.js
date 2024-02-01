import {request} from './request';

/**
 * 登录接口
 * @param {string} params.username 
 * @param {string} params.password 
 * @returns 
 */
export const reqLogin = (params) => request.post('/admin/login', params);

/**
 * 修改密码接口
 * @param {string} params.oldPwd 
 * @param {string} params.newPwd 
 * @returns 
 */
export const reqEditPwd = (params) => request.post('/admin/pwd', params);

/**
 * 获取信息接口
 * @returns 
 */
export const reqGetInfo = () => request.get('/admin/info');

/**
 * 修改信息接口
 * @param {string} params.name
 * @param {string} params.github
 * @param {string} params.email
 * @param {string} params.description
 * @returns 
 */
export const reqEditInfo = (params)=> request.post('/admin/edit', params);