<script setup>
import { defineComponent, ref } from "vue";
import SideMenu from "../components/SideMenu.vue";
import Header from "../components/Header.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
const collapsed = ref(false); // 初始化折叠状态
</script>

<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" width="240">
            <SideMenu
                :collapsed="collapsed"
                style="overflow: auto; height: 100vh"
            ></SideMenu>
        </a-layout-sider>
        <a-layout style="overflow: auto; height: 100vh">
            <a-layout-header style="background: #fff; padding: 0">
                <Header v-model:collapsed="collapsed"></Header>
            </a-layout-header>
            <a-layout-content style="margin: 0">
                <Breadcrumb></Breadcrumb>
                <div
                    :style="{
                        padding: '0',
                        minHeight: 'calc(100vh - 200px)',
                    }"
                >
                    <router-view></router-view>
                </div>
                 <a-layout-footer style="text-align: center">
                Uligoe Blog ©2022 Created by bulv
            </a-layout-footer>
            </a-layout-content>
           
        </a-layout>
    </a-layout>
</template>

<style>
.site-layout .site-layout-background {
    background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
    background: #141414;
}
[data-theme="light"] .site-layout .site-layout-background {
    background: #fff;
}
</style>