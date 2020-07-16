import request from '@/utils/request'

export async function queryOrderList(params) {
  return request('/order/order_list', { params })
}
export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params
  return request('/order/fake_list', {
    method: 'POST',
    params: {
      count
    },
    data: { ...restParams, method: 'delete' }
  })
}
export async function addFakeList(params) {
  const { count = 5, ...restParams } = params
  return request('/order/fake_list', {
    method: 'POST',
    params: {
      count
    },
    data: { ...restParams, method: 'post' }
  })
}
export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params
  return request('/order/fake_list', {
    method: 'POST',
    params: {
      count
    },
    data: { ...restParams, method: 'update' }
  })
}
export async function queryRefundList(params) {
  return request('/order/refund_list', {
    method: 'POST',
    params: params
  })
}
export async function queryRefundCondition(params) {
  return request('/order/refund_list_condition', {
    method: 'POST',
    params: params
  })
}
