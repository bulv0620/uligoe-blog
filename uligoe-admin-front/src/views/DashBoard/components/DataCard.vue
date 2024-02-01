<script setup>
import { ref, watch } from "vue";

const props = defineProps({
    number: {
        type: Number,
        default: 0,
    },
    title: {
        type: String,
        default: "",
    },
    color: {
        type: String,
        default: "blue",
    },
});

const count = ref(props.number - 150 > 0 ? props.number - 150 : 0);

const slowltCountNumber = (number) => {
    const timer = setInterval(() => {
        if (count.value >= number) {
            clearInterval(timer);
        }
        else {
            count.value += 1;
        }
    }, 5);
    return count;
};

watch(() => props.number, newVal => {
    slowltCountNumber(newVal);
}, { immediate: true })
</script>

<template>
    <div class="data-card" :class="props.color">
        <h1 class="title">{{ props.title }}</h1>
        <h1 class="number">{{ count }}</h1>
        <div class="icon-slot">
            <slot class="icon"></slot>
        </div>
    </div>
</template>

<style lang="less" scoped>
.data-card {
    width: 100%;
    height: 100px;
    border-radius: 4px;
    position: relative;
    backdrop-filter: blur(2px);

    .title {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.6);
        padding-top: 14px;
        padding-left: 18px;
    }

    .number {
        font-size: 32px;
        color: rgba(0, 0, 0, 0.9);
        margin-top: -8px;
        padding-left: 18px;
    }

    .icon-slot {
        position: absolute;
        top: 14px;
        right: 18px;
    }

    &.blue {
        background-image: linear-gradient(to bottom, #409eff40, #ffffff90);
    }

    &.red {
        background-image: linear-gradient(to bottom, #f56c6c40, #ffffff90);
    }

    &.green {
        background-image: linear-gradient(to bottom, #67c23a40, #ffffff90);
    }

    &.yellow {
        background-image: linear-gradient(to bottom, #e6a23c40, #ffffff90);
    }
}
</style>