import request from '@/utils/request'
import { clearStorage } from '@/utils/utils'
export async function accountLogin(params) {
  await clearStorage()
  return request('/admin/login', {
    method: 'POST',
    data: params
  })
  // return axios.request({
  //   url: 'https://api.2048888.xyz/admin/login',
  //   method: 'POST',
  //   data: params
  // })
}
export async function register(params) {
  console.log(params)
  return request('/admin/register', {
    method: 'POST',
    data: params
  })
}
export async function signOut() {
  return request('/admin/signout', {
    method: 'GET'
  })
}
export async function getFakeCaptcha(mobile) {
  return request(`/login/captcha?mobile=${mobile}`)
}
