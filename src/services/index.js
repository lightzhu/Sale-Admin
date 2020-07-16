import request from '@/utils/request'

export async function submitBasicInfo(params) {
  return request('/product/basicInfo', {
    method: 'POST',
    data: params
  })
}
export async function submitAdvanceInfo(params) {
  return request('/product/advanceInfo', {
    method: 'POST',
    data: params
  })
}
export async function updateBasicInfo(params) {
  return request('/product/updateInfo', {
    method: 'POST',
    data: params
  })
}
