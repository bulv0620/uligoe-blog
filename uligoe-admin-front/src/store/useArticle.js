import { message } from "ant-design-vue";
import { defineStore } from "pinia";
import * as api from '../api/articleApi'

export const useArticle = defineStore('article', {
    state: () => ({
        articleList: [],
        queryParams: {
            categoryId: null,
            tagId: null,
            keyword: ''
        },
        loading: false,
        deletedArticleList: [],

    }),

    getters: {
        params(state) {
            const obj = {}
            Object.keys(state.queryParams).forEach(item => {
                if (state.queryParams[item] !== null && state.queryParams[item] !== '') {
                    obj[item] = state.queryParams[item];
                }
            })
            return obj
        }
    },

    actions: {
        resetQueryParams() {
            this.queryParams.categoryId = null;
            this.queryParams.tagId = null;
            this.queryParams.keyword = '';
            this.getArticleList();
        },

        async getDeletedArticle() {
            const res = await api.reqGetArticleList({ isDeleted: true });
            if (res.code === 1) {
                this.deletedArticleList = res.data;
            }
        },

        async getArticleList() {
            this.loading = true;
            const res = await api.reqGetArticleList(this.params);
            this.loading = false;
            if (res.code === 1) {
                this.articleList = res.data;
            }
        },

        async recyle(id, mode) {
            const res = await api.reqRecycleArticle(id, mode);
            if (res.code === 1) {
                message.success(res.message);
                this.getArticleList();
            }
            else {
                message.error(res.message);
            }
        },


        async deleteArticle(id) {
            const res = await api.reqDeleteArticle(id);
            if (res.code === 1) {
                message.success(res.message);
            }
            else {
                message.error(res.message);
            }
        }

    }
})