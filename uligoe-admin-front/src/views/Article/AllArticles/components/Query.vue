<script setup>
import { SearchOutlined, PlusOutlined, DeleteOutlined, UndoOutlined } from "@ant-design/icons-vue";
import { useCategory } from "../../../../store/useCategory";
import { useTag } from "../../../../store/useTag";
import { useArticle } from "../../../../store/useArticle";
import { storeToRefs } from "pinia";

const categoryStore = useCategory();
const tagStore = useTag();
const articleStore = useArticle();

const { categoryList, loading: categoryLoading } = storeToRefs(categoryStore);
const { tagList, loading: tagLoading } = storeToRefs(tagStore);
const { queryParams } = storeToRefs(articleStore);
</script>

<template>
    <div class="options">
        <div class="left">
            <router-link to="/write">
                <a-button type="primary">
                    <template #icon>
                        <PlusOutlined />
                    </template>
                    写文章
                </a-button>
            </router-link>
            <a-button style="margin-left: 10px" @click="$emit('showDialog')">
                <template #icon>
                    <DeleteOutlined />
                </template>
                回收站
            </a-button>
        </div>
        <div class="right">
            <a-select :loading="categoryLoading" ref="select" v-model:value="queryParams.categoryId"
                style="width: 180px;" placeholder="筛选分类" @click.once="categoryStore.getCategoryList">
                <a-select-option :value="categoryItem.id" v-for="categoryItem in categoryList" :key="categoryItem.id">{{
                        categoryItem.title
                }}</a-select-option>
            </a-select>
            <a-select ref="select" :loading="tagLoading" v-model:value="queryParams.tagId"
                style="width: 180px; margin-left: 10px" placeholder="筛选标签" @click.once="tagStore.getTagList">
                <a-select-option :value="tagItem.id" v-for="tagItem in tagList" :key="tagItem.id">{{ tagItem.title
                }}
                </a-select-option>
            </a-select>

            <a-input v-model:value="queryParams.keyword" placeholder="输入关键词搜索" style="width: 180px; margin-left: 10px">
            </a-input>

            <a-button style="margin-left: 10px" type="primary" @click="articleStore.getArticleList">
                <template #icon>
                    <SearchOutlined />
                </template>
                搜索
            </a-button>
            <a-button style="margin-left: 10px" @click="articleStore.resetQueryParams">
                <template #icon>
                    <UndoOutlined />
                </template>
                重置
            </a-button>
        </div>
    </div>
</template>

<style scoped lang="less">
.options {
    background: #fff;
    padding: 18px;
    display: flex;
    justify-content: space-between;
}
</style>
