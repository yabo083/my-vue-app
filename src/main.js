import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './assets/less/index.less'
import { createPinia } from 'pinia' // 导入 Pinia
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import api from './api/api.js'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// app.use(ElementPlus)
app.config.globalProperties.$api = api
app.use(router).use(createPinia())
app.mount('#app')

