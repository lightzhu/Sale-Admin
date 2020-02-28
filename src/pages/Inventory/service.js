import request from '@/utils/request'

export async function queryTable(params) {
  return request('/api/rule', {
    params
  })
}
export async function disableShop(params) {
  return request('/api/disableShop', {
    params
  })
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' }
  })
}
export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' }
  })
}
