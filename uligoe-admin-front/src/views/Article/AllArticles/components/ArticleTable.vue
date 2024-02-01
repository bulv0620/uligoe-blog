<script setup>
import { onMounted } from 'vue'
import { useArticle } from '../../../../store/useArticle';
import { storeToRefs } from 'pinia';
import {useRouter} from 'vue-router';

// 文章列表数据
const articleStore = useArticle();
const { articleList, loading } = storeToRefs(articleStore);
onMounted(() => {
    articleStore.getArticleList();
})

// 选中项目的函数们
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
        );
    },
    getCheckboxProps: (record) => ({}),
};

// 表格的列名配置列表
const columns = [
    {
        title: "标题",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "状态",
        dataIndex: "status",
        key: "status",
    },
    {
        title: "分类",
        dataIndex: "category",
        key: "category",
    },
    {
        title: "标签",
        dataIndex: "tags",
        key: "tags",
        width: "200px",
    },
    {
        title: "评论",
        dataIndex: "comments",
        key: "comments",
    },
    {
        title: "访问",
        dataIndex: "views",
        key: "views",
    },
    {
        title: "发布时间",
        dataIndex: "publish_time",
    },
    {
        title: "操作",
        key: "operation",
    },
];

function recycleArticle(id) {
    articleStore.recyle(id, 'delete');
}


const router = useRouter();
function editArticle(article) {
    article.tag_list = Object.values(article.tag_list).map(item => item.id);
    console.log(article.tag_list)
    router.push({name:'write', params: article})
}

</script>

<template>
    <div class="table">
        <a-table :row-selection="rowSelection" :columns="columns" :data-source="articleList" :loading="loading">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'title'">
                    <a :href="`/articles/${record.id}`" target="_blank">
                        {{ record.title }}
                    </a>
                </template>

                <template v-if="column.key === 'status'">
                    <span :style="
                        record.status === '公开'
                            ? 'color: #67C23A'
                            : 'color: #E6A23C'
                    ">{{ record.status }}</span>
                </template>

                <template v-else-if="column.key === 'category'">
                    <a-tag color="blue">
                        {{ record.category }}
                    </a-tag>
                </template>

                <template v-else-if="column.key === 'tags'">
                    <span>
                        <a-tag v-for="(tag) in record.tag_list" :key="tag.id" :color="tag.color"
                            style="margin-bottom: 4px">
                            {{ tag.title }}
                        </a-tag>
                    </span>
                </template>

                <template v-else-if="column.key === 'comments'">
                    <a-badge :count="record.comment_count || 0" :overflow-count="99"
                        :number-style="{ backgroundColor: '#f38181' }" :showZero="true" />
                </template>

                <template v-else-if="column.key === 'views'">
                    <a-badge :count="record.visit_count || 0" :overflow-count="9999"
                        :number-style="{ backgroundColor: '#00e0ff' }" :showZero="true" />
                </template>

                <template v-else-if="column.key === 'operation'">
                    <a @click="editArticle(record)">编辑</a>
                    <a-divider type="vertical" />
                    <a @click="recycleArticle(record.id)">删除</a>
                    <!-- <a-divider type="vertical" />
                    <a>设置</a> -->
                </template>
            </template>
        </a-table>
    </div>
</template>

<style scoped lang="less">
.table {
    background: #fff;
    padding: 0 18px;
}
</style>
