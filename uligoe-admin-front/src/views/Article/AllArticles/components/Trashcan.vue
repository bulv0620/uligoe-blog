<script setup>
import { DeleteOutlined, UndoOutlined } from "@ant-design/icons-vue";
import { ref, watch } from 'vue';
import { useArticle } from "../../../../store/useArticle";
import { storeToRefs } from "pinia";

const articleStore = useArticle();
const { deletedArticleList } = storeToRefs(articleStore);
const loading = ref(false);

const emits = defineEmits(['update:showDialog']);

const props = defineProps({
    showDialog: {
        type: Boolean,
        default: false,
        required: true
    }
})

const visible = ref(false);

watch(visible, (newVal) => {
    emits('update:showDialog', newVal);
})

watch(() => props.showDialog, async (newVal) => {
    visible.value = newVal;
    if (newVal) {
        loading.value = true;
        await articleStore.getDeletedArticle();
        loading.value = false;
    }
})


function recoverArticle(id) {
    articleStore.recyle(id, 'recover');
    visible.value = false;
}

async function confirm(id) {
    // console.log(id)
    await articleStore.deleteArticle(id);
    loading.value = true;
    await articleStore.getDeletedArticle();
    loading.value = false;
}
</script>

<template>
    <a-modal v-model:visible="visible" title="回收站" :bodyStyle="{ maxHeight: '400px', overflow: 'auto' }" :footer="null">
        <a-list :loading="loading" size="large" :data-source="deletedArticleList">
            <template #renderItem="{ item }">
                <a-list-item>
                    <div style="max-width:360px">
                        {{ item.title }}
                    </div>
                    <div>
                        <a-popconfirm title="确认删除吗？" ok-text="确认" cancel-text="取消" @confirm="confirm(item.id)">
                            <a>
                                <DeleteOutlined></DeleteOutlined>
                            </a>
                        </a-popconfirm>

                        <a-divider type="vertical" />
                        <a @click="recoverArticle(item.id)">
                            <a-tooltip>
                                <template #title>恢复</template>
                                <UndoOutlined></UndoOutlined>
                            </a-tooltip>
                        </a>
                    </div>
                </a-list-item>
            </template>
        </a-list>
    </a-modal>
</template>

<style scoped lang="less">
</style>
