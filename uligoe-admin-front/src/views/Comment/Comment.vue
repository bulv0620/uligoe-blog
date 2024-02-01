<script setup>
import { watch, ref, onMounted } from 'vue'
import Table from './components/Table.vue'
import Query from './components/Query.vue';
import { useComment } from '../../store/useComment';
import { storeToRefs } from 'pinia';

const commentStore = useComment();
const { commentList, pageSize, pageNo, total, keyword, loading, type } = storeToRefs(commentStore);

watch(type, newVal => {
  commentStore.getCommentList();
}, { immediate: true })

onMounted(() => {
  type.value = 'station'
})

</script>

<template>
  <div class="comment ">
    <div class="comment-panel">
      <a-tabs v-model:activeKey="type">
       <a-tab-pane key="station" tab="站点评论">
        </a-tab-pane>
        <a-tab-pane key="article" tab="文章评论">
        </a-tab-pane>
      </a-tabs>
      <Query v-model:keyword="keyword" @reset="commentStore.reset" @search="commentStore.getCommentList()">
      </Query>
      <Table @search="commentStore.getCommentList()" @delete="commentStore.deleteComment" :commentType="type" :commentList="commentList" :loading="loading"
        v-model:pageSize="pageSize" v-model:pageNo="pageNo" :total="total"></Table>
    </div>
  </div>
</template>

<style scoped lang="less">
.comment {
  padding: 24px;

  .comment-panel {
    width: 100%;
    background: #fff;
    padding: 0 24px;
  }
}
</style>