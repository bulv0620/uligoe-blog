import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import 'nprogress/nprogress.css'


import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

import { createPinia } from 'pinia'
const pinia = createPinia()

const app = createApp(App)
app.use(pinia).use(router).use(Antd).use(Vue3ColorPicker).mount('#app')
