import request from '@/utils/request'
import { clearStorage } from '@/utils/utils'
export async function accountLogin(params) {
  await clearStorage()
  return request('/login/signIn', {
    method: 'POST',
    data: params
  })
}
export async function register(params) {
  return request('/login/register', {
    method: 'POST',
    data: params
  })
}
export async function getFakeCaptcha(mobile) {
  return request(`/login/captcha?mobile=${mobile}`)
}
