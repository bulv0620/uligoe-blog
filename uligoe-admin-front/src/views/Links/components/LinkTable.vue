<script setup>
const columns = [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '地址',
        dataIndex: 'url',
        key: 'url',
    },
    {
        title: '操作',
        key: 'command'
    },
]

const props = defineProps({
    list: {
        type: Array,
        required: true
    }
})

const emits = defineEmits(['handleDelete', 'handleModify']);
</script>

<template>
    <a-table :columns="columns" :data-source="props.list">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'url'">
                <a :href="record.url" target="_blank">{{ record.url }}</a>
            </template>
            <template v-if="column.key === 'command'">
                <a @click="emits('handleModify', record);">修改</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确认删除?" ok-text="Yes" cancel-text="No" @confirm="emits('handleDelete', record.id)">
                    <a>删除</a>
                </a-popconfirm>
            </template>
        </template>
    </a-table>
</template>

<style lang="less" scoped>
</style>