<script setup>
import { UploadOutlined, InboxOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons-vue';
import { useFile } from '../../store/useFile';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const fileStore = useFile();
const { fileList, visible, name, uploadList, url } = storeToRefs(fileStore)

onMounted(() => {
  fileStore.getFileList()
})

</script>

<template>
  <div class="file-lib">
    <a-modal v-model:visible="visible" title="上传文件">
      <template #footer>
        <a-button key="back" @click="visible = false">取消</a-button>
        <a-button key="submit" type="primary" @click="fileStore.insertFile">导入</a-button>
      </template>

      <a-upload-dragger v-model:fileList="uploadList" name="file" :maxCount="1"
        action="/api/file/upload" @change="fileStore.handleChange">
        <p class="ant-upload-drag-icon">
          <inbox-outlined></inbox-outlined>
        </p>
        <p class="ant-upload-text">点击或拖拽文件到当前位置上传</p>
      </a-upload-dragger>
      <a-input v-model:value="name" style="margin-top:20px" placeholder="输入文件标题"></a-input>
    </a-modal>
    <div class="file-lib-panel">
      <a-button type="primary" @click="visible = true">
        <template #icon>
          <UploadOutlined />
        </template>
        上传
      </a-button>
      <a-empty v-if="fileList.length === 0"></a-empty>
      <a-row v-else class="file-list" :gutter="[8, 8]">
        <a-col :span="6" v-for="file in fileList">
          <a-card hoverable style="margin: 10px;margin-left: 0;">
            <template #cover>
              <img alt="example" height="260" style="object-fit:cover" :src="file.url" />
            </template>
            <template #actions>
              <DownloadOutlined key="download" @click="fileStore.download(file.url)" />
              <a-popconfirm title="确认删除吗?" ok-text="确认" cancel-text="取消" @confirm="fileStore.delete(file.id, file.url)">
                <DeleteOutlined key="delete" />
              </a-popconfirm>
            </template>
            <a-card-meta :title="file.name">
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<style lang='less' scoped>
.file-lib {
  padding: 24px;

  .file-lib-panel {
    background: #fff;
    padding: 24px;
  }
}
</style>