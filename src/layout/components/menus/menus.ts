import type { MenuType } from "@/types/menu"

export const menus: MenuType[] = [
  {
    id: 1,
    name: '首页',
    icon: 'HomeFilled',
    path: '/home',
    hidden: false
  },
  {
    id: 2,
    name: '数据',
    icon: 'List',
    path: '',
    hidden: false,
    children: [
      {
        id: 20001,
        name: '瀑布流',
        path: '/waterfallFlow',
        hidden: false,
      },
      {
        id: 20002,
        name: '无限加载',
        path: '/unlimitedLoading',
        hidden: false,
      }
    ]
  }
]