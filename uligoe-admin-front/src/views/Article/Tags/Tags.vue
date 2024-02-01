<script setup>
import { PlusOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { useTag } from "../../../store/useTag";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const tagStore = useTag();
const { tagList, loading, status, title, color } = storeToRefs(tagStore);
onMounted(() => {
    tagStore.getTagList();
    tagStore.clear();
})

</script>

<template>
    <div class="tags">
        <a-row justify="space-around">
            <a-col :span="10">
                <div class="tags-form">
                    <a-card :title="status === 'add' ? '添加标签' : '修改标签'" :bordered="false">
                        <a-form :model="tagStore" name="basic" @finish="tagStore.onFinish"
                            @finishFailed="tagStore.onFinishFailed">
                            <a-form-item label="标签名称" name="title" :rules="[
                                {
                                    required: true,
                                    message: '请填写标签的名称',
                                },
                            ]">
                                <a-input v-model:value="title" placeholder="请填写标签名称" />
                            </a-form-item>

                            <a-form-item label="标签颜色" name="color" :rules="[
                                {
                                    required: true,
                                    message: '请选择标签的颜色',
                                },
                            ]">
                                <a-input v-model:value="color">
                                    <template #addonAfter>
                                        <ColorPicker v-model:pureColor="color"></ColorPicker>
                                    </template>
                                </a-input>
                            </a-form-item>

                            <a-form-item>
                                <a-button type="primary" html-type="submit">
                                    <template #icon>
                                        <UploadOutlined />
                                    </template>上传
                                </a-button>
                                <a-button v-if="status !== 'add'" style="margin-left: 10px" @click="tagStore.clear">
                                    <template #icon>
                                        <PlusOutlined />
                                    </template>新建标签
                                </a-button>
                                <a-popconfirm title="确认删除吗?" ok-text="确认" cancel-text="取消"
                                    @confirm="tagStore.deleteTag">
                                    <a-button v-if="status !== 'add'" style="margin-left: 10px">
                                        <template #icon>
                                            <DeleteOutlined />
                                        </template>删除标签
                                    </a-button>
                                </a-popconfirm>
                            </a-form-item>
                        </a-form>
                    </a-card>
                </div>
            </a-col>
            <a-col :span="13">
                <div class="tags-panel">
                    <a-card title="所有标签" :bordered="false" :loading="loading">
                        <a-empty v-if="tagList.length === 0"></a-empty>
                        <a-tag v-else v-for="tag in tagList" :key="tag" :color="tag.color"
                            @click="tagStore.onTagClick(tag)" style="cursor: pointer">
                            {{ tag.title }}
                        </a-tag>
                    </a-card>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<style lang='less' scoped>
.tags {
    padding: 24px;

    .tags-form {
        width: 100%;
        background: #fff;
    }

    .tags-panel {
        width: 100%;
        background: #fff;
    }
}
</style>