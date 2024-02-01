<script setup>
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { message } from 'ant-design-vue';
import SelectFile from "../../../components/SelectFile.vue";
import { reactive, toRefs, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { request } from '../../../api/request';
import { useCategory } from "../../../store/useCategory";
import { useTag } from "../../../store/useTag";
import { storeToRefs } from "pinia";
import { reqUploadArticle, reqEditArticle } from "../../../api/articleApi";
import { useRoute } from 'vue-router'
import axios from "axios";

const router = useRouter();
const route = useRoute();
const article = route.params;
const categoryStore = useCategory();
const tagStore = useTag();
const { categoryList, loading: categoryLoading } = storeToRefs(categoryStore);
const { tagList, loading: tagLoading } = storeToRefs(tagStore);

const writeState = reactive({
    h1: '新文章',
    title: '',
    content: '',
})
const { h1, title, content } = toRefs(writeState);

const uploadState = reactive({
    visible: false,
    uploading: false,
    status: '公开',
    belongTo: '',
    bgImg: '',
    selectedTag: [],
    layout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 21 },
    },
    description: ''
})
const { visible, uploading, status, belongTo, selectedTag, bgImg, description } = toRefs(uploadState);

const ruleForm = ref(null);

const uploadFn = {
    async handleOk() {
        try {
            await ruleForm.value.validate();
            const reqFn = h1.value === '新文章' ? reqUploadArticle : reqEditArticle;
            const params = {
                status: status.value,
                title: title.value,
                content: content.value,
                belongTo: belongTo.value,
                tags: Object.values(selectedTag.value),
                bgImg: bgImg.value,
                description: description.value
            }
            if (h1.value !== '新文章') {
                params.id = article.id;
            }
            uploading.value = true;
            const res = await reqFn(params);
            uploading.value = false;
            if (res.code === 1) {
                message.success(res.message);
                visible.value = false;
                router.push('/articles')
            }
            else {
                message.error(res.message);
            }
        } catch (error) { }
    },

    handleCancel() {
        visible.value = false;
    },

    showUploadDialog() {
        if (title.value === '') {
            message.error('请先填写标题')
            return
        }
        if (content.value === '') {
            message.error('请填写文章内容')
            return
        }
        visible.value = true
    },

    onFinish(values) {
        // console.log('Success:', values);
    },

    onFinishFailed(errorInfo) {
        // console.log('Failed:', errorInfo);
    },
}


const onUploadImg = async (files, callback) => {
    const res = await Promise.all(
        files.map((file) => {
            return new Promise((rev, rej) => {
                const form = new FormData();
                form.append('file', file);

                request
                    .post('/api/file/upload', form, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then((res) => rev(res))
                    .catch((error) => rej(error));
            });
        })
    );

    callback(res.map((item) => item.data.url));
};

const loading = ref(false);
onMounted(async () => {
    if (JSON.stringify(article) !== '{}') {
        h1.value = '编辑文章';
        loading.value = true;
        const res = await axios.get(article.content_url);
        loading.value = false;
        content.value = res.data + '';
        await categoryStore.getCategoryList();
        await tagStore.getTagList();

        title.value = article.title;
        status.value = article.status;
        belongTo.value = article.belong_to;
        bgImg.value = article.bg_img;
        selectedTag.value = article.tag_list;
        description.value = article.description;
    }
})
</script>

<template>
    <a-modal v-model:visible="visible" title="上传文章">
        <template #footer>
            <a-button key="back" @click="uploadFn.handleCancel" :disabled="uploading">取消</a-button>
            <a-button key="submit" type="primary" :loading="uploading" @click="uploadFn.handleOk">上传</a-button>
        </template>
        <a-form ref="ruleForm" :model="uploadState" v-bind="uploadState.layout" name="upload-info"
            @finish="uploadFn.onFinish" @finishFailed="uploadFn.onFinishFailed" autocomplete="off">
            <a-form-item name="status" label="状态" :rules="[{ required: true, message: '请选择发布状态' }]">
                <a-select ref="select" v-model:value="status">
                    <a-select-option value="公开">公开</a-select-option>
                    <a-select-option value="私密">私密</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item name="bgImg" label="背景" :rules="[{ required: true, message: '请选择背景图' }]">
                <SelectFile v-model:fileName="bgImg"></SelectFile>
            </a-form-item>

            <a-form-item name="belongTo" label="分类" :rules="[{ required: true, message: '请选择分类' }]">
                <a-select ref="select" v-model:value="belongTo" placeholder="请选择分类" :loading="categoryLoading"
                    @click.once="categoryStore.getCategoryList">
                    <a-select-option :value="categoryItem.id" v-for="categoryItem in categoryList"
                        :key="categoryItem.id">{{ categoryItem.title }}</a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item name="selectedTag" label="标签" :rules="[{ required: true, message: '请选择标签', type: 'array' }]">
                <!-- <a-input :value="props. /> -->
                <a-select v-model:value="selectedTag" mode="multiple" placeholder="选择标签" :loading="tagLoading"
                    @click.once="tagStore.getTagList">
                    <a-select-option :value="tagItem.id" v-for="tagItem in tagList" :key="tagItem.id">{{ tagItem.title
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item name="description" label="简介" :rules="[{ required: true, message: '请输入简介' }]">
                <a-textarea v-model:value="description" :rows="4"></a-textarea>
            </a-form-item>
        </a-form>
    </a-modal>
    <div class="write-page">
        <div class="top">
            <h1 class="title">{{ h1 }}</h1>
            <a-button type="primary" class="upload-btn" @click="uploadFn.showUploadDialog">上传</a-button>
        </div>
        <div class="content">
            <a-input placeholder="输入文章标题" v-model:value="title"></a-input>
            <md-editor v-model="content" class="mt" @on-upload-img="onUploadImg"> </md-editor>
        </div>
    </div>
</template>

<style lang='less' scoped>
.write-page {
    .top {
        height: 60px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        background: #fff;
        padding: 0 20px;
        position: sticky;
        top: 0px;
        z-index: 99;
        border-bottom: 1px solid #f5f5f5;

        .title {
            font-size: 24px;
            color: rgba(0, 0, 0, 0.85);
        }

        .upload-btn {
            margin-top: 10px;
        }
    }

    .content {
        padding: 24px;
    }

    .mt {
        margin-top: 18px;
    }
}
</style>