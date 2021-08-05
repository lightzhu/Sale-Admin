import request from '@/utils/request'

export async function queryTable (params) {
  return request('/product/inventory', {
    method: 'GET',
    params
  })
}
export async function updateSoldStatus (params) {
  return request('/product/updateSoldStatus', { params })
}
export async function removeProduct (params) {
  return request('/product/removeItem', { params })
}
export async function updateRule (params) {
  return request('/product/rule', {
    method: 'POST',
    data: { ...params, method: 'update' }
  })
}
export async function updateProductInfo (params) {
  return request('/product/updateItem', {
    method: 'POST',
    data: { ...params }
  })
}

export async function addProductPic (params) {
  return request('/product/addPic', {
    method: 'POST',
    requestType: 'form',
    data: params
  })
}
export async function removeProductPic (params) {
  return request('/product/removePic', { params })
}

