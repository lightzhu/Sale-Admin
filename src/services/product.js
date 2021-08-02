import request from '@/utils/request'

export async function submitBasicInfo (params) {
  return request('/product/addProduct', {
    method: 'POST',
    data: params
  })
}
export async function submitAdvanceInfo (params) {
  return request('/product/addProductAdvance', {
    method: 'POST',
    requestType: 'form',
    data: params
  })
}