const Login = () => import('../views/login/index.vue')
const Layout = () => import('../layout/layout.vue')
const Home = () => import('../views/home/index.vue')

export default {
  Login,
  Home,
  Layout
} as const