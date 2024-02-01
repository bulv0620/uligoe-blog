import { defineStore } from 'pinia';
import * as api from '../api/fileApi'
import { message } from 'ant-design-vue';

export const useFile = defineStore('file', {
    state: () => ({
        fileList: [],
        name: '',
        uploadList: [],
        url: '',
        visible: false,
    }),

    actions: {
        clear() {
            this.url = '';
            this.name = '';
            this.uploadList = [];
        },

        async insertFile() {
            if (this.url === '') {
                message.error('请上传文件');
                return
            }
            if (this.name === '') {
                message.error('请输入文件名');
                return
            }

            const res = await api.reqInsertFile({
                name: this.name,
                url: this.url
            })
            if (res.code === 1) {
                message.success(res.message);
                this.getFileList();
                this.visible = false;
                this.clear();
            }
            else {
                message.error(res.message);
            }
        },

        async getFileList() {
            const res = await api.reqGetFileList();
            if (res.code === 1) {
                this.fileList = res.data;
            }
        },

        handleChange(info) {
            const status = info.file.status;
            if (status === 'done') {
                message.success(`${info.file.name} 文件上传成功`);
                this.url = info.fileList[0].response.data.url;
            }
            if (status === 'error') {
                message.error(`${info.file.name} 文件上传失败`);
            }
            if (status === 'removed') {
                message.info(`${info.file.name} 文件移除成功`);
                this.url = '';
            }
        },

        async delete(id, url) {
            const res = await api.reqDeleteFile(id, url.split('/')[2]);
            if(res.code === 1){
                message.success(res.message);
                this.getFileList();
            }
            else{
                message.error(res.message);
            }
        },

        download(url) {
            window.open(url);
        }
    }
})