<script setup>
import { ref } from "vue";
import ArticleTable from "./components/ArticleTable.vue";
import Query from './components/Query.vue'
import Trashcan from "./components/Trashcan.vue";

const showDialog = ref(false)
</script>

<template>
    <div class="all-articles">
        <Trashcan v-model:showDialog="showDialog"></Trashcan>
        <Query @showDialog="showDialog = true"></Query>
        <ArticleTable></ArticleTable>
    </div>
</template>

<style lang='less' scoped>
.all-articles {
    padding: 24px;
}
</style>