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
    redirect: { name: 'home' },
    children: [
      {
        path: 'home',
        name: 'home',
        component: com.default.Home,
        meta: {
          title: '首页'
        }
      },
      {
        path: 'waterfallFlow',
        name: 'waterfallFlow',
        component: com.default.WaterfallFlow,
        meta: {
          title: '瀑布流'
        }
      },
      {
        path: 'unlimitedLoading',
        name: 'unlimitedLoading',
        component: com.default.UnlimitedLoading,
        meta: {
          title: '无限加载'
        }
      }
    ]
  }
]

export default routes