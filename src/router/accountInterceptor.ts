import { type Router } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useLogin } from '@/store/modules/login'


function accountIntercept(router: Router) {
  router.beforeEach((_to, _from, next) => {
    const { userInfo } = storeToRefs(useLogin())

    if (!userInfo.value.token && _to.name !== 'login') {
      return next('/login')
    }

    next()
  })
}

export default accountIntercept