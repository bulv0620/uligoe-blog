import { defineStore } from "pinia";
import * as api from '../api/linkApi'
import { message } from "ant-design-vue";

export const useLink = defineStore('link', {
    state: () => ({
        classList: [],
        activeId: '',
        linkList: [],
        classLoading: false,
        linkLoading: false,
        modifyForm: null
    }),

    getters: {
        activeTitle(state) {
            const target = state.classList.find(item => item.id===state.activeId)
            return target?.title || '未选择分类'
        }
    },

    actions: {
        async getLinkClassList() {
            this.classLoading = true;
            const res = await api.reqGetLinkClassList();
            this.classLoading = false;
            if (res.code === 1) {
                this.classList = res.data;
            }
        },

        async getLinkList() {
            this.linkLoading = true;
            const res = await api.reqGetLinkListByClassId(this.activeId);
            this.linkLoading = false;
            if (res.code === 1) {
                this.linkList = res.data;
            }
        },

        async updateClassPos() {
            await api.reqUpdateClassPos(this.classList);
        },

        async uploadClass(name) {
            const res = await api.reqUploadLinkClass(name);
            if (res.code === 1) {
                this.getLinkClassList();
                message.success(res.message);
            }
            else {
                message.error(res.message);
            }
        },

        async deleteLinkClass(id){
            const res = await api.reqDeleteLinkClass(id);
            if(res.code === 1){
                this.getLinkClassList();
                message.success(res.message);
                if(id === this.activeId){
                    this.activeId = this.classList[0]?.id;
                }
            }
            else{
                message.error(res.message);
            }
        },

        async deleteLink(id){
            const res = await api.reqDeleteLink(id);
            if(res.code === 1){
                message.success(res.message);
                this.getLinkList();
            }
            else {
                message.error(res.message);
            }
        }
    }
})