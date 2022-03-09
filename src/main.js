import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css'
import router from './router'
// 事件总线
import mitt from 'mitt'
const emitter = mitt();

const app = createApp(App);
app.use(ElementPlus)
    .use(router)
    .provide('emitter', emitter)
    .mount('#app');
