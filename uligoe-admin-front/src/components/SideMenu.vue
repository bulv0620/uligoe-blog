<script setup>
import {
    PieChartOutlined,
    FileTextOutlined,
    MessageOutlined,
    UserOutlined,
    SettingOutlined,
    PictureOutlined
} from "@ant-design/icons-vue";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const props = defineProps({
    collapsed: {
        type: Boolean,
        default: false,
    },
});

const selectedKeys = ref(['/']);

const route = useRoute();
const router = useRouter();

// 初始化选中的菜单
onMounted(() => {
    selectedKeys.value = [route.path];
});

// 监听路由变化
watch(
    () => route.path,
    (path) => {
        selectedKeys.value = [path];
    }
)

// 监听菜单项点击
watch(selectedKeys, (keys) => {
    router.push(keys[0]);
});
</script>

<template>
    <div class="side-menu">
        <div class="logo">
            <h1 :class="{ active: props.collapsed }">Uligoe</h1>
        </div>
        <a-menu class="menu" v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" >
            <a-menu-item key="/dashboard">
                <pie-chart-outlined />
                <span>仪表盘</span>
            </a-menu-item>
            <a-sub-menu key="sub1">
                <template #title>
                    <span>
                        <file-text-outlined />
                        <span>文章</span>
                    </span>
                </template>
                <a-menu-item key="/articles">所有文章</a-menu-item>
                <a-menu-item key="/write">写文章</a-menu-item>
                <a-menu-item key="/category">分类目录</a-menu-item>
                <a-menu-item key="/tags">标签</a-menu-item>
            </a-sub-menu>
            <a-menu-item key="/comment">
                <message-outlined />
                <span>评论</span>
            </a-menu-item>
            <a-menu-item key="/filelib">
                <PictureOutlined />
                <span>附件</span>
            </a-menu-item>
            <a-sub-menu key="sub2">
                <template #title>
                    <span>
                        <user-outlined />
                        <span>用户</span>
                    </span>
                </template>
                <a-menu-item key="/links_manage">链接管理</a-menu-item>
                <a-menu-item key="/personal">个人资料</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
                <template #title>
                    <span>
                        <setting-outlined />
                        <span>系统</span>
                    </span>
                </template>
                <!-- <a-menu-item key="/set">博客设置</a-menu-item> -->
                <a-menu-item key="/about">关于</a-menu-item>
            </a-sub-menu>
        </a-menu>
    </div>
</template>

<style lang="less" scoped>
.side-menu {
    .logo {
        height: 64px;
        background: #002140;

        h1 {
            background: linear-gradient(to right, #1e75c5, #c2c6ca);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            font-size: 24px;
            font-weight: 900;
            line-height: 64px;
            text-align: center;
            transition: all 0.1s;

            &:hover {
                cursor: pointer;
                background: linear-gradient(to right, #3f89ce, #fafafa);
                background-clip: text;
                -webkit-background-clip: text;
                color: transparent;
            }

            &.active {
                font-size: 18px;
            }
        }
    }

    .menu {
        margin-top: 10px;
    }
}
</style>