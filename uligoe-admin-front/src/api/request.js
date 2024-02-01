import axios from 'axios';
import nProgress from 'nprogress';
import { useUser } from '../store/useUser';
import router from '../router'

const ConfigBaseURL = '/api';

let userStore = null;

export const request = axios.create({
    timeout: 10000, // 请求超时时间
    baseURL: ConfigBaseURL,
    method: 'post',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

// 添加请求拦截器
request.interceptors.request.use(config => {
    if (!userStore) {
        userStore = useUser();
    }
    nProgress.start();
    config.headers.Authorization = userStore.token;
    return config;
})

// 添加响应拦截器
request.interceptors.response.use(response => {
    nProgress.done();
    return response.data;
}, error => {
    nProgress.done();
    if (error.response.status === 401) {
        userStore.logout();
        router.push('/');
        return Promise.reject('验证已过期，请重新登陆')
    }
    return Promise.reject(error.response.data)
})