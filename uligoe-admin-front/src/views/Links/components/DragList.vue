<script setup>
import { DeleteOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue'
import { ref, createVNode } from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
const props = defineProps({
    list: {
        required: true,
        type: Array
    },
    activeId: {
        required: true,
        type: String
    }
})

const emits = defineEmits(['update:activeId', 'handleUpdate', 'handleAddClass', 'handleDelete'])

const newClassName = ref('');

function addClass() {
    emits('handleAddClass', newClassName.value);
    newClassName.value = '';
}

let dragIndex;
let hasChanged = false;
const deleteActive = ref(false);

function dragstart(index) {
    dragIndex = index;
}

function dragenter(e, index) {
    e.preventDefault();

    // 避免源对象触发自身的dragenter事件
    if (dragIndex !== index) {
        const source = props.list[dragIndex];
        props.list.splice(dragIndex, 1);
        props.list.splice(index, 0, source);
        // 排序变化后目标对象的索引变成源对象的索引
        dragIndex = index;
        hasChanged = true;
    }
}

function dragover(e, index) {
    e.preventDefault();
}

function dragend(e) {
    e.preventDefault();
    if (hasChanged) {
        emits('handleUpdate');
        hasChanged = false;
    }
    deleteActive.value = false;
}

function deleteDrop(e) {
    e.preventDefault();
    const id = props.list[dragIndex].id;
    Modal.confirm({
        title: 'Confirm',
        icon: createVNode(ExclamationCircleOutlined),
        content: '确认删除吗',
        okText: '确认',
        cancelText: '取消',
        onOk() {
            emits('handleDelete', id);
        },
        onCancel() { },
    });


}

function deleteOver(e) {
    e.preventDefault();
    deleteActive.value = true;
}

function deleteLeave(e) {
    e.preventDefault();
    deleteActive.value = false;
}

function changeActiveItem(id) {
    emits('update:activeId', id);
}
</script>

<template>
    <ul class="list">
        <transition-group name="drag" class="list" tag="ul">
            <li v-for="(item, index) in props.list" :key="item.id" class="list-item"
                :class="{ active: item.id === activeId }" @dragenter="dragenter($event, index)"
                @dragover="dragover($event, index)" @dragstart="dragstart(index)" @dragend="dragend" draggable="true"
                @click="changeActiveItem(item.id)">
                {{ item.title }}
            </li>
        </transition-group>
        <li class="list-item trashbin" @drop="deleteDrop" @dragover="deleteOver" @dragleave="deleteLeave"
            :class="{ active: deleteActive }">
            <delete-outlined />
        </li>
        <li class="add-item">
            <a-input v-model:value="newClassName" placeholder="请输入新建分类名称" @keydown.enter="addClass"></a-input>
        </li>
    </ul>

</template>


<style lang="less" scoped>
.list {
    list-style: none;
    padding: 0;

    .drag-move {
        transition: transform .3s;
    }

    .list-item {
        cursor: grab;
        width: 100%;
        border-radius: 4px;
        background: #a0cfff;
        color: #FFFFFF;
        margin-bottom: 6px;
        height: 50px;
        line-height: 50px;
        text-align: center;

        &.active {
            background: #409EFF;
        }

        &.trashbin {
            background: #C0C4CC;
            font-size: 1.2rem;
            cursor: default;
            transition: all .3s ease;

            &.active {
                background: #F56C6C;
                font-size: 1.4rem;
            }
        }
    }

    .add-item {
        margin-top: 16px;
    }

}
</style>