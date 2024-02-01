<script setup>
import { onMounted, ref, watch } from 'vue';
import { useFile } from '../store/useFile';
import { storeToRefs } from 'pinia';

const props = defineProps({
    fileName: {
        required: true,
        type: String
    }
})
const emits = defineEmits(['update:fileName']);

const value = ref('');

watch(value, (newVal) => {
    emits('update:fileName', newVal);
})

watch(() => props.fileName, (newVal) => {
    value.value = newVal;
}, { immediate: true })

const visible = ref(false)

const fileStore = useFile();
const { fileList } = storeToRefs(fileStore);

onMounted(() => {
    fileStore.getFileList();
})

const onImgClick = (url) => {
    value.value = url;
    visible.value = false;
}
</script>

<template>
    <a-input v-model:value="value" @click="visible = true" placeholder="请选择文件">
    </a-input>
    <a-modal v-model:visible="visible" title="选择文件" :footer="null">
        <div style="max-height: 500px;overflow:auto">
            <a-row>
                <a-col :span="12" v-for="file in fileList">
                    <a-card hoverable style="margin: 10px;margin-left: 0;" @click="onImgClick(file.url)">
                        <template #cover>
                            <img alt="example" height="180" style="object-fit:cover"
                                :src="file.url" />
                        </template>
                        <a-card-meta :title="file.name">
                        </a-card-meta>
                    </a-card>
                </a-col>
            </a-row>
        </div>
    </a-modal>
</template>

<style scoped lang="less">
</style>
