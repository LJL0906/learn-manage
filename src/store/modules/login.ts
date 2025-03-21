
import { defineStore } from 'pinia'
import { useRef } from '@/hooks'

interface LoginState {
  user: string
  time: string
  token: string
  avatar: string
  roles: string[]
  permissions?: string[]
  routes?: string[]
  menus?: string[]
  buttons?: string[]
}

export const useLogin = defineStore('login', () => {
  const userInfo = useRef<LoginState>({
    user: '',
    time: '',
    token: '',
    avatar: '',
    roles: [],
    permissions: [],
    routes: [],
    menus: [],
    buttons: []
  })
  const setUserInfo = (user: LoginState) => {
    userInfo.setValue(user)
  }
  const clearUserInfo = () => {
    userInfo.reset()
  }
  return { userInfo, setUserInfo, clearUserInfo }
}, {
  persist: true
})