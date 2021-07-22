import request from '@/utils/request'
export async function updateBasicInfo (params) {
  return request('/product/updateInfo', {
    method: 'POST',
    data: params
  })
}
