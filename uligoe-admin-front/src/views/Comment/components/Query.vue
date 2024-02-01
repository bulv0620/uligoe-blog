<script setup>
import { ref, watch } from 'vue'
import { SearchOutlined, UndoOutlined } from "@ant-design/icons-vue";
const props = defineProps({
    keyword: {
        required: true,
        type: String
    }
})

const emits = defineEmits(['update:keyword', 'search', 'reset'])

const value = ref('')

// 双向监听绑定数据
watch(() => props.keyword, newVal => {
    value.value = newVal;
})

watch(value, newVal => {
    emits('update:keyword', newVal)
})
</script>

<template>
    <div>
        <a-input placeholder="输入关键词搜索" style="width: 180px; margin-left: 10px" v-model:value="value"></a-input>
        <a-button style="margin-left: 10px" type="primary" @click="$emit('search')">
            <template #icon>
                <SearchOutlined />
            </template>
            搜索
        </a-button>
        <a-button style="margin-left: 10px" @click="$emit('reset')">
            <template #icon>
                <UndoOutlined />
            </template>
            重置
        </a-button>
    </div>
</template>

<style scoped lang="less">
</style>
