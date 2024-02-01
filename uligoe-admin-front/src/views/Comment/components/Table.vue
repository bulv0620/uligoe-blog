<script setup>
import { computed } from 'vue';

const props = defineProps({
    commentList: {
        required: true,
        type: Array
    },
    loading: {
        required: true,
        type: Boolean
    },
    pageSize: {
        required: true,
        type: Number
    },
    pageNo: {
        required: true,
        type: Number
    },
    total: {
        required: true,
        type: Number
    },
    commentType: {
        required: true,
        type: String
    }
})

const emits = defineEmits(['update:pageSize', 'update:pageNo', 'search', 'delete'])

// 表格选项
const columns = [
    {
        title: "昵称",
        dataIndex: "user",
        key: "user",
    },
    {
        title: "内容",
        dataIndex: "content",
        key: "content",
        width: "300px"
    },
    {
        title: "邮箱",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "评论目标",
        dataIndex: "article_title",
        key: "article_title",
        width: "200px",
    },
    {
        title: "日期",
        dataIndex: "publish_time",
        key: "publish_time",
    },
    {
        title: "操作",
        key: "operation",
        width: "200px",
    },
]

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



const pagination = computed(() => ({
    total: props.total,
    showTotal: total => `共 ${total} 条数据`,
    current: props.pageNo,
    pageSize: props.pageSize,
    defaultPageSize: 5,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '15', '20'],
    onShowSizeChange: (current, pageSize) => {
        emits('update:pageSize', pageSize);
        emits('search')
    },
}));

function tableChange(e) {
    emits('update:pageNo', e.current);
    emits('search')
}
</script>

<template>
    <a-table :pagination="pagination" @change="tableChange" class="comment-table" :row-selection="rowSelection"
        :columns="columns" :data-source="props.commentList" :loading="props.loading">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'operation'">
                <!-- <a>回复</a> -->
                <!-- <a-divider type="vertical" /> -->
                <a-popconfirm title="确认删除吗?" ok-text="确认" cancel-text="取消" @confirm="$emit('delete', record.id)">
                    <a>删除</a>
                </a-popconfirm>

            </template>


            <template v-if="column.key === 'article_title'">
                <a v-if="commentType === 'article'">{{ record.article_title }}</a>
                <span v-else style="color:darkgray">站点评论</span>
            </template>
        </template>
    </a-table>
</template>

<style lang="less" scoped>
.comment-table {
    margin: 18px 0;
}
</style>