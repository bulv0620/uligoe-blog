<script setup>
import { onMounted, ref, watch } from "vue";
import { _debounce } from "@/utils/common";
import * as echarts from "echarts";
import emitter from "@/utils/eventbus";

// 每日访问量列表
const props = defineProps({
    visitCountList: {
        type: Array,
        default: []
    }
})

const createLineChart = (dom, data) => {
    let chartDom = document.getElementById(dom);
    let myChart = echarts.init(chartDom);
    let option;

    const xData = data.map((item) => item.date.substring(5, 10));
    const yData = data.map((item) => item.count);

    option = {
        grid: {
            top: "10px",
            left: "20px",
            right: "30px",
            bottom: "10px",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: xData,
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                itemStyle: {
                    lineStyle: {
                        color: "#409EFF80",
                    },
                },

                label: {
                    show: true,
                    position: "top",
                },
                type: "line",
                stack: "Total",
                areaStyle: {
                    color: "#409EFF30",
                },
                data: yData,
            },
        ],
    };

    option && myChart.setOption(option);
};

const resizeChart = () => {
    _debounce(() => {
        echarts.init(document.getElementById("chart-content")).resize();
    })();
};

onMounted(() => {
    emitter.on("resizeChartEmit", resizeChart);
    window.addEventListener("resize", () => {
        resizeChart();
    });
});

watch(() => props.visitCountList, newVal => {
    createLineChart("chart-content", newVal.reverse())
})

</script>

<template>
    <div id="chart-content"></div>
</template>

<style lang="less" scoped>
#chart-content {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>