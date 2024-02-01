import {request} from './request';

/**
 * 获取仪表盘数据接口
 * @returns 
 */
export const reqGetStatistics = () => request.get('/dashboard');