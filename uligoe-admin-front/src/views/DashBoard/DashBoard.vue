<script setup>
import DataCard from "./components/DataCard.vue";
import LineChart from "./components/LineChart.vue";
import Comment from "./components/Comment.vue";
import {
    PlusOutlined,
    UnorderedListOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons-vue";
import { toRefs, reactive, onMounted, computed } from 'vue'
import * as api from '../../api/dashboardApi'
import { message } from "ant-design-vue";
import { useUser } from "../../store/useUser";

const userStore = useUser();
// 建站天数
const days = computed(() => getDiffDate(userStore.userInfo.create_time))

function getDiffDate(targetDate) {
    let date1 = new Date(targetDate);
    let date2 = new Date();
    date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const diff = date2.getTime() - date1.getTime();
    const diffDate = diff / (24 * 60 * 60 * 1000);
    return diffDate;
}

// 仪表盘数据
const dataState = reactive({
    visitCountList: [], // 访问量列表
    articleCount: 0, // 文章总数
    commentCount: 0, // 评论总数
    visitCount: 0 // 访问总数
})
const { visitCountList, articleCount, commentCount, visitCount } = toRefs(dataState)

onMounted(async () => {
    try {
        const res = await api.reqGetStatistics();
        if (res.code === 1) {
            dataState.visitCountList = res.data.visit_count_list || [];
            dataState.visitCount = parseInt(res.data.visit_count) || 0;
            dataState.articleCount = res.data.article_count || 0;
            dataState.commentCount = res.data.comment_count || 0;
        }
        else {
            message.error('获取仪表盘数据失败')
        }
    } catch (err) {
        message.error(typeof err === 'string' ? err : err.message)
    }
})

</script>

<template>
    <div class="dash-board" >
        <a-row justify="space-around" class="data-cards-panel">
            <a-col :span="5">
                <DataCard :title="'文章'" :number="articleCount" class="data-card">
                    <a-popover>
                        <router-link to="/write">
                            <plus-outlined class="cursor-pointer" :style="{ color: '#1890ff' }"></plus-outlined>
                        </router-link>
                        <template #content> 写文章 </template>
                    </a-popover>
                </DataCard>
            </a-col>
            <a-col :span="5">
                <DataCard :title="'评论'" :number="commentCount" :color="'red'" class="data-card">
                    <a-popover>
                        <router-link to="/comment">
                            <unordered-list-outlined class="cursor-pointer" :style="{ color: '#1890ff' }">
                            </unordered-list-outlined>
                        </router-link>
                        <template #content> 查看评论 </template>
                    </a-popover>
                </DataCard>
            </a-col>
            <a-col :span="5">
                <DataCard :title="'建站天数'" :number="days" :color="'yellow'" class="data-card">
                    <a-popover>
                        <info-circle-outlined class="cursor-pointer" :style="{ color: '#00000080' }">
                        </info-circle-outlined>
                        <template #content>
                            建站时间: {{ userStore.userInfo.create_time }}
                        </template>
                    </a-popover>
                </DataCard>
            </a-col>
            <a-col :span="5">
                <DataCard :title="'总访问量'" :number="visitCount" :color="'green'" class="data-card">
                    <a-popover>
                        <info-circle-outlined class="cursor-pointer" :style="{ color: '#00000080' }">
                        </info-circle-outlined>
                        <template #content> 访问量: {{ visitCount }} </template>
                    </a-popover>
                </DataCard>
            </a-col>
        </a-row>
        <a-row justify="space-between" class="chart-info-panel">
            <a-col :span="12">
                <div class="chart panel">
                    <h1 class="title">每日访问量</h1>
                    <div class="content">
                        <LineChart :visitCountList="visitCountList"></LineChart>
                    </div>
                </div>
            </a-col>
            <a-col :span="11">
                <div class="news panel">
                    <h1 class="title">最新评论</h1>
                    <div class="content">
                        <Comment></Comment>
                    </div>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<style lang="less" scoped>
.dash-board {
    padding: 24px;

    .data-cards-panel {
        .data-card {
            .cursor-pointer {
                cursor: pointer;
            }
        }
    }

    .chart-info-panel {
        padding: 24px;

        .panel {
            width: 100%;
            height: 350px;
            background: #fff;
            border-radius: 4px;

            .title {
                padding: 16px 18px 0 18px;
                font-size: 16px;
                font-weight: bold;
            }

            .content {
                width: 100%;
                height: 280px;
                padding: 20px;
                padding-bottom: 0;
                overflow: auto;
            }
        }
    }
}
</style>