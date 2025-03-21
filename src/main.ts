import { createApp } from 'vue'
import './assets/css/normalize.css'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './router'
import pinia from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 导入初始化函数
import { initGlobalStorage } from './utils/storage'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 初始化全局存储工具
initGlobalStorage()

app.use(router)
app.use(pinia)

router.isReady().then(() => {
  app.mount('#app')
}).catch((error) => {
  console.error('Router failed to be ready:', error)
})
