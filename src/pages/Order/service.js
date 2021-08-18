import request from '@/utils/request'

export async function queryOrderList (params) {
  return request('/order/list', { params })
}
export async function removeFakeList (params) {
  const { ...restParams } = params
  return request('/order/fake_list', {
    method: 'POST',
    data: { ...restParams, method: 'delete' }
  })
}
export async function addFakeList (params) {
  const { ...restParams } = params
  return request('/order/fake_list', {
    method: 'POST',
    data: { ...restParams, method: 'post' }
  })
}
export async function updateFakeList (params) {
  const { ...restParams } = params
  return request('/order/fake_list', {
    method: 'POST',
    data: { ...restParams, method: 'update' }
  })
}
export async function refundList (params) {
  return request('/order/refund_list', {
    method: 'GET',
    params: params
  })
}
export async function queryRefundCondition (params) {
  return request('/order/refund_list_condition', {
    method: 'GET',
    params: params
  })
}
