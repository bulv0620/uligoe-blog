<script setup>
import {ref, onMounted, watch} from 'vue'
import {useRoute} from 'vue-router'

const route = useRoute()

const routeList = ref([])

onMounted(() => {
    routeList.value = route.meta.breadcrumb
})

watch(() => route.path, () => {
    routeList.value = route.meta.breadcrumb
})

</script>

<template>
    <div class="breadcrumb">
        <a-breadcrumb style="margin: 10px 0">
        <a-breadcrumb-item><router-link to="/">首页</router-link></a-breadcrumb-item>
        <a-breadcrumb-item v-for="item,index in routeList" :key="index">
            {{item}}
        </a-breadcrumb-item>
    </a-breadcrumb>
    </div>
</template>

<style lang="less" scoped>
.breadcrumb {
    padding: 6px 16px;
    background: #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, .12);
}
</style>