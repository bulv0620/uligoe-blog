<script setup>
import GlobalLayout from './layout/GlobalLayout.vue';
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
    <GlobalLayout v-if="route.path !== '/login'"></GlobalLayout>
    <router-view v-else></router-view>
</template>

<style lang="less" scoped>
</style>