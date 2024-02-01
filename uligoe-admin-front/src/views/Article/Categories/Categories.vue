<script setup>
import { PlusOutlined, UploadOutlined } from "@ant-design/icons-vue";
import CategoryList from "./components/CategoryList.vue";
import SelectFile from "../../../components/SelectFile.vue";
import { useCategory } from "../../../store/useCategory";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
};

const categoryStore = useCategory();
const { categoryList, loading, title, coverImg, description, status } = storeToRefs(categoryStore);

onMounted(() => {
    categoryStore.getCategoryList();
    categoryStore.clear();
})

</script>

<template>
    <div class="category">
        <a-row justify="space-around">
            <a-col :span="10">
                <div class="category-form">
                    <a-card :title="status === 'add' ? '添加分类' : '修改分类'" :bordered="false">
                        <a-form v-bind="layout" :model="categoryStore" name="basic" @finish="categoryStore.onFinish"
                            @finishFailed="categoryStore.onFinishFailed">
                            <a-form-item label="名称" name="title" :rules="[{ required: true, message: '请填写标签的名称' }]">
                                <a-input v-model:value="title" placeholder="请输入标签名称" />
                            </a-form-item>

                            <a-form-item label="封面" name="coverImg" :rules="[{ required: true, message: '请选择封面图' }]">
                                <SelectFile v-model:fileName="coverImg"></SelectFile>
                            </a-form-item>

                            <a-form-item label="描述" name="title">
                                <a-textarea v-model:value="description" :rows="4" />
                            </a-form-item>

                            <a-form-item>
                                <a-button type="primary" html-type="submit">
                                    <template #icon>
                                        <UploadOutlined />
                                    </template>上传
                                </a-button>

                                <a-button v-if="status !== 'add'" style="margin-left: 10px"
                                    @click="categoryStore.clear">
                                    <template #icon>
                                        <PlusOutlined />
                                    </template>新建分类
                                </a-button>
                            </a-form-item>
                        </a-form>
                    </a-card>
                </div>
            </a-col>
            <a-col :span="13">
                <div class="category-panel">
                    <a-card title="所有分类" :bordered="false" :loading="loading">
                        <CategoryList :categoryList="categoryList" @edit="categoryStore.onCategoryEditClick"
                            @delete="categoryStore.deleteCategory">
                        </CategoryList>
                    </a-card>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<style lang='less' scoped>
.category {
    padding: 24px;

    .category-form {
        width: 100%;
        background: #fff;
    }

    .category-panel {
        width: 100%;
        background: #fff;
    }
}
</style>