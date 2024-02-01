import { defineStore } from "pinia";
import * as api from '../api/categoryApi'
import { message } from "ant-design-vue";

export const useCategory = defineStore('category', {
    state: () => ({
        categoryList: [],
        loading: false,
        title: '',
        coverImg: '',
        description: '',
        status: 'add',
        id: ''
    }),

    actions: {
        async getCategoryList() {
            this.loading = true;
            const res = await api.reqGetCategoryList();
            this.loading = false;
            if (res.code === 1) {
                this.categoryList = res.data;
            }
        },

        async uploadCategory() {
            const uploadFn = this.status === 'add' ? api.reqUploadCategory : api.reqEditCategory;
            const params = {
                title: this.title,
                coverImg: this.coverImg,
                description: this.description
            }
            if (this.status !== 'add') {
                params.id = this.id
            }

            const res = await uploadFn(params);
            if (res.code === 1) {
                message.success(res.message);
                this.clear();
                this.getCategoryList();
            }
            else {
                message.error(res.message);
            }
        },

        async deleteCategory(id) {
            const res = await api.reqDeleteCategory(id);
            if (res.code === 1) {
                message.success(res.message);
                this.clear();
                this.getCategoryList();
            }
            else {
                message.error(res.message);
            }
        },

        // 编辑分类
        onCategoryEditClick(category) {
            this.status = 'edit';
            this.title = category.title;
            this.coverImg = category.cover_img;
            this.description = category.description;
            this.id = category.id;
        },

        // 回到添加状态
        clear() {
            this.status = 'add';
            this.title = '';
            this.coverImg = '';
            this.description = '';
            this.id = '';
        },

        // 表单验证通过
        onFinish(values) {
            console.log("Success:", values);
            // 上传
            this.uploadCategory();
        },

        // 表单验证不通过
        onFinishFailed(errorInfo) {
            console.log("Failed:", errorInfo);
        }
    }
})