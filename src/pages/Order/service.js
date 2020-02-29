import request from '@/utils/request'

export async function queryOrderList(params) {
  return request('/api/order_list', { params })
}
export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count
    },
    data: { ...restParams, method: 'delete' }
  })
}
export async function addFakeList(params) {
  const { count = 5, ...restParams } = params
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count
    },
    data: { ...restParams, method: 'post' }
  })
}
export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count
    },
    data: { ...restParams, method: 'update' }
  })
}
