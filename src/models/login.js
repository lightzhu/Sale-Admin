import { stringify } from 'querystring'
import { router } from 'umi'
import { accountLogin, register, signOut } from '@/services/login'
import { setAuthority } from '@/utils/authority'
import { getPageQuery, clearStorage } from '@/utils/utils'
import { message } from "antd";
const Model = {
  namespace: 'login',
  state: {
    status: 200,
    message: '',
    id: null,
    token: null,
    isRegister: 0,
    email: ''
  },
  effects: {
    *login ({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload)
      // console.log(response)
      yield put({
        type: 'changeLoginStatus',
        payload: response
      })
      if (response.status === 200) {
        const urlParams = new URL(window.location.href)
        const params = getPageQuery()
        console.log(params)
        let { redirect } = params
        if (redirect) {
          const redirectUrlParams = new URL(redirect)
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length)
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1)
            }
          } else {
            window.location.href = '/'
            return
          }
        }
        router.replace(redirect || '/')
      } else {
        message.error(response.message)
      }
    },
    *register ({ payload }, { call, put }) {
      const response = yield call(register, payload)
      if (response.status == 200) {
        yield put({
          type: 'changeRegisterStatus',
          payload: { data: response.data, email: payload.email }
        })
        router.push('/user/regresult')
      } else {
        message.error(response.message)
      }
    },

    async logout () {
      await clearStorage()
      const { redirect } = getPageQuery() // Note: There may be security issues, please note
      const resp = await signOut()
      console.log(resp)
      console.log(window.location.pathname)
      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href
          })
        })
      }
    }
  },
  reducers: {
    changeLoginStatus (state, { payload }) {
      const { id, _id, role } = payload.data
      setAuthority(role)
      window.sessionStorage.setItem('id', id)
      // window.sessionStorage.setItem('shopId', id)
      window.sessionStorage.setItem('token', _id)
      return { ...state, status: payload.status, message: payload.message, ...payload.data }
    },
    changeRegisterStatus (state, { payload }) {
      window.sessionStorage.setItem('email', payload.email)
      return { ...state, isRegister: payload.data, email: payload.email }
    },
  }
}
export default Model
