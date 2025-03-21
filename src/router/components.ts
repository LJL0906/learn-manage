const Login = () => import('../views/login/index.vue')
const Layout = () => import('../layout/layout.vue')
const Home = () => import('../views/home/index.vue')
const WaterfallFlow = () => import('../views/dataList/waterfallFlow/index.vue')
const UnlimitedLoading = () => import('../views/dataList/unlimitedLoading/index.vue')

export default {
  Login,
  Home,
  Layout,
  WaterfallFlow,
  UnlimitedLoading
} as const