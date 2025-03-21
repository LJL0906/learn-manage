import { useRef } from '@/hooks'
import { defineStore } from 'pinia'

export const useMenus = defineStore('menus', () => {
  const menus = useRef([])


  const setMenus = (menu: any) => {
    menus.value = menu
  }
  const clearMenus = () => {
    menus.clear()
  }

  return {
    menus,
    setMenus,
    clearMenus,
  }
}, {
  persist: {
    storage: sessionStorage,
  },
})
