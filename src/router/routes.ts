import { type RouteRecordRaw } from 'vue-router'
import * as com from './components'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: com.default.Login,
    meta: {
      title: '登录',
      hidden: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: com.default.Layout,
    children: [
      {

        path: 'home',
        name: 'home',
        component: com.default.Home,
      }
    ]
  }
]

export default routes