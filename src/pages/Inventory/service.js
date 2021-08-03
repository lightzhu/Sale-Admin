import request from '@/utils/request'

export async function queryTable (params) {
  return request('/product/inventory', {
    method: 'GET',
    params
  })
}
export async function disableShop (params) {
  return request('/product/disableProduct', {
    params
  })
}
export async function removeProduct (params) {
  return request('/product/removeProduct', {
    params
  })
}
export async function updateRule (params) {
  return request('/product/rule', {
    method: 'POST',
    data: { ...params, method: 'update' }
  })
}
