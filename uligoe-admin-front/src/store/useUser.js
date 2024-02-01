import { message } from 'ant-design-vue';
import { defineStore } from 'pinia'
import * as api from '../api/adminApi';

export const useUser = defineStore('user', {
    state: () => ({
        userInfo: null,
        token: localStorage.getItem('USER_TOKEN') || '',
        tempUserInfo: {},
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
    }),

    actions: {
        clear(){
            Object.assign(this.tempUserInfo, this.userInfo);
            this.oldPwd = '';
            this.newPwd = '';
            this.rePwd = '';
        },

        async login(username, password) {
            const res = await api.reqLogin({ username, password })
            if (res.code === 1) {
                this.token = res.data.token;
                localStorage.setItem('USER_TOKEN', res.data.token);
            }
            else {
                return Promise.reject(res.message)
            }
        },

        async getUserInfo() {
            const res = await api.reqGetInfo();
            if (res.code === 1) {
                this.userInfo = res.data;
            }
            else {
                return Promise.reject(res.message);
            }
        },

        async editUserInfo(params){
            const res = await api.reqEditInfo(params);
            if(res.code === 1){
                message.success(res.message);
                await this.getUserInfo();
                this.clear()
            }
            else{
                message.error(res.message);
            }
        },

        async editPwd(){
            const res = await api.reqEditPwd({
                oldPwd: this.oldPwd,
                newPwd: this.newPwd
            });
            if(res.code === 1){
                message.success(res.message);
                this.getUserInfo();
            }
            else{
                message.error(res.message);
            }
        },

        async logout() {
            this.token = null;
            localStorage.removeItem('USER_TOKEN');
        },
    }
})