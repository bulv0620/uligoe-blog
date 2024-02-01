import { defineStore } from "pinia";
import * as api from '../api/tagApi'
import { message } from "ant-design-vue";

export const useTag = defineStore('tag', {
    state: () => ({
        tagList: [],
        loading: false,
        status: 'add',
        title: '',
        color: 'rgb(32, 151, 243)',
        id: ''
    }),

    actions: {
        async getTagList() {
            this.loading = true;
            const res = await api.reqGetTagList()
            this.loading = false;
            if (res.code === 1) {
                this.tagList = res.data
            }
        },

        async uploadTag() {
            const uploadFn = this.status === 'add' ? api.reqUploadTag : api.reqEditTag;
            const params = {
                title: this.title,
                color: this.color
            }
            if (this.status !== 'add') {
                params.id = this.id;
            }

            const res = await uploadFn(params);
            if (res.code === 1) {
                message.success(res.message);
                this.clear();
                this.getTagList();
            }
            else {
                message.error(res.message);
            }

        },

        async deleteTag() {
            const res = await api.reqDeleteTag(this.id);
            if (res.code === 1) {
                message.success(res.message);
                this.clear();
                this.getTagList();
            }
            else {
                message.error(res.message);
            }
        },

        clear() {
            this.status = "add";
            this.title = "";
            this.color = "rgb(32, 151, 243)";
            this.id = ''
        },

        onTagClick(tag) {
            this.status = 'edit';
            this.title = tag.title;
            this.color = tag.color;
            this.id = tag.id;
        },

        // 表单验证通过
        onFinish(values) {
            // console.log("Success:", values);
            // 上传
            this.uploadTag();
        },

        // 表单验证不通过
        onFinishFailed(errorInfo) {
            console.log("Failed:", errorInfo);
        }
    }
})