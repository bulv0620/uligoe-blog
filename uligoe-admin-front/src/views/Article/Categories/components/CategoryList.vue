<script setup>
const props = defineProps({
    categoryList: {
        type: Array,
        required: true
    }
})

const emits = defineEmits(['edit', 'delete'])

</script>

<template>
    <a-list class="category-list" item-layout="horizontal" :data-source="props.categoryList">
        <template #renderItem="{ item }">
            <a-list-item>
                <template #actions>
                    <a key="list-loadmore-edit" @click="$emit('edit', item)">修改</a>
                    <a-popconfirm title="确认删除吗?" ok-text="确认" cancel-text="取消" @confirm="$emit('delete', item.id)">
                        <a key="list-loadmore-more">删除</a>
                    </a-popconfirm>

                </template>
                <a-list-item-meta :description="item.description">
                    <template #title>
                        <a>{{ item.title }}</a>

                    </template>
                    <template #avatar>
                        <a-image :width="55" :src="item.cover_img" />
                    </template>
                </a-list-item-meta>

            </a-list-item>
        </template>
    </a-list>
</template>

<style scoped lang="less">
</style>
