import request from '@/utils/request'

export async function submitBasicInfo (params) {
  return request('/goods/addProduct', {
    method: 'POST',
    data: params
  })
}
export async function submitAdvanceInfo (params) {
  return request('/goods/addProductAdvance', {
    method: 'POST',
    requestType: 'form',
    data: params
  })
}