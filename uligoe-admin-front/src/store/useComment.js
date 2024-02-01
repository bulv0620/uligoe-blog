import { defineStore } from 'pinia';
import * as api from '../api/commentApi'
import { message } from 'ant-design-vue';

export const useComment = defineStore('comment', {
    state: () => ({
        commentList: [],
        pageSize: 5,
        pageNo: 1,
        total: 10,
        keyword: '',
        loading: false,
        type: 'article'
    }),

    actions: {
        async getCommentList( pageSize = this.pageSize) {
            const params = {
                pageSize,
                type: this.type,
                pageNo: this.pageNo,
                keyword: this.keyword
            }
            this.loading = true;
            const res = await api.reqGetCommentList(params);
            this.loading = false;
            if (res.code === 1) {
                this.commentList = res.data.list;
                this.total = res.data.total;
            }
        },

        async deleteComment(id){
            const res = await api.reqDeleteComment(id);
            if(res.code === 1){
                message.success(res.message);
                this.getCommentList();
            }
            else{
                message.error(res.message);
            }
        },

        reset(){
            this.keyword = '';
            this.pageNo = 1;
            this.getCommentList();
        }
    }
})