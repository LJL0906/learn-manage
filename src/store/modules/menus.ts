import { useRef } from '@/hooks'
import { defineStore } from 'pinia'
import type { CrumbsType, MenuType } from '@/types/menu'

export const useMenus = defineStore('menus', () => {
  const menus = useRef<MenuType[]>([])
  const crumbs = useRef<CrumbsType[]>([])


  const setMenus = (menu: MenuType[]) => {
    menus.value = menu
  }
  const clearMenus = () => {
    menus.clear()
  }

  const setCrumbs = (crumb: CrumbsType[]) => {
    crumbs.value = crumb
  }

  const clearCrumbs = () => {
    crumbs.clear()
  }

  return {
    menus,
    crumbs,
    setMenus,
    clearMenus,
    setCrumbs,
    clearCrumbs,
  }
}, {
  persist: {
    storage: sessionStorage,
  },
})
