import request from '@/utils/request'

export async function queryTable(params) {
  return request('/api/inventory', {
    params
  })
}
export async function disableShop(params) {
  return request('/api/disableShop', {
    params
  })
}
export async function removeProduct(params) {
  return request('/api/removeProduct', {
    params
  })
}
export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' }
  })
}
