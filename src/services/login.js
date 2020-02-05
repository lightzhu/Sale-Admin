import request from '@/utils/request'
export async function fakeAccountLogin(params) {
  console.log(0)
  return request('/api/login/account', {
    method: 'POST',
    data: params
  })
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`)
}
