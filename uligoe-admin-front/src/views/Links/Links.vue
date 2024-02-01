<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import DragList from './components/DragList.vue';
import LinkTable from './components/LinkTable.vue';
import LinkModal from './components/LinkModal.vue';
import { useLink } from '@/store/useLink.js';
import { storeToRefs } from 'pinia';

const linkStore = useLink();
const { classList, activeId, linkList, modifyForm, activeTitle } = storeToRefs(linkStore);

onMounted(async () => {
  await linkStore.getLinkClassList();
  if (classList.value.length > 0 && !activeId.value) {
    activeId.value = classList.value[0].id;
  }
})

watch(activeId, () => {
  linkStore.getLinkList();
})

const linkModalVisible = ref(false);

function handleModify(item){
  modifyForm.value = item;
  linkModalVisible.value = true;
}
</script>

<template>
  <div class="links">
    <a-row justify="space-around">
      <a-col :span="10">
        <a-card title="链接分类" :bordered="false">
          <a-empty v-if="classList.length === 0"></a-empty>
          <DragList v-else :list="classList" v-model:activeId="activeId" @handleUpdate="linkStore.updateClassPos"
            @handleAddClass="linkStore.uploadClass" @handleDelete="linkStore.deleteLinkClass"></DragList>
        </a-card>
      </a-col>

      <a-col :span="13">
        <a-card :title="activeTitle" :bordered="false">
          <LinkModal v-model:visible="linkModalVisible" v-model:modifyForm="modifyForm"></LinkModal>
          <template #extra>
            <a @click="linkModalVisible = true">新增</a>
          </template>
          <LinkTable @handleModify="handleModify" :list="linkList" @handleDelete="linkStore.deleteLink"></LinkTable>
        </a-card>
      </a-col>
    </a-row>

  </div>
</template>

<style lang="less" scoped>
.links {
  padding: 24px;



}
</style>