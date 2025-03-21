import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import accountInterceptor from './accountInterceptor'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

accountInterceptor(router)

export default router