<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useLink } from '@/store/useLink';
import { storeToRefs } from 'pinia';
import * as api from '@/api/linkApi.js'
import { message } from 'ant-design-vue';

const props = defineProps({
    visible: {
        required: true,
        type: Boolean
    },
    modifyForm: {
        type: Object,
        default: {}
    }
})
const emits = defineEmits(['update:visible', 'update:modifyForm'])

const show = ref(false);
const form = ref(null);
const linkState = reactive({
    id: '',
    name: '',
    url: ''
})

const title = computed(() => linkState.id === '' ? '新增链接' : '修改链接')

watch(() => props.modifyForm, () => {
    if (props.modifyForm?.id) {
        linkState.id = props.modifyForm.id;
        linkState.name = props.modifyForm.name;
        linkState.url = props.modifyForm.url;
    }
})

watch(show, () => {
    if (show.value === false) {
        linkState.id = '';
        linkState.name = '';
        linkState.url = '';
        emits('update:modifyForm', null);
    }
    emits('update:visible', show.value);
})

watch(() => props.visible, () => {
    show.value = props.visible;
})

const linkStore = useLink();
const { activeId: classId } = storeToRefs(linkStore);
async function handleOk() {
    try {
        const formState = await form.value.validate();
        if (linkState.id === '') {
            await uploadNewLink(formState);
        }
        else {
            await updateLink(formState)
        }
    } catch (err) { }

}

async function uploadNewLink(formState) {
    const res = await api.reqUploadLink({ ...formState, classId: classId.value });
    if (res.code === 1) {
        message.success(res.message);
        await linkStore.getLinkList();
        show.value = false;
    }
    else {
        message.error(res.message);
    }
}

async function updateLink(formState) {
    const res = await api.reqUpdateLink({ ...formState, id: linkState.id });
    if (res.code === 1) {
        message.success(res.message);
        await linkStore.getLinkList();
        show.value = false;
    }
    else {
        message.error(res.message);
    }
}

</script>

<template>
    <a-modal v-model:visible="show" :title="title" @ok="handleOk" ok-text="上传" cancel-text="取消">
        <a-form :model="linkState" ref="form">
            <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请输入链接名称' }]">
                <a-input v-model:value="linkState.name" placeholder="输入链接名称"></a-input>
            </a-form-item>
            <a-form-item label="地址" name="url" :rules="[{ required: true, message: '请输入链接地址' }]">
                <a-input v-model:value="linkState.url" placeholder="输入链接地址"></a-input>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<style lang="less" scoped>
</style>