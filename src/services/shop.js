import request from '@/utils/request'
// 获取店铺id
export async function getShopById (params) {
  return request('/shop/getShopById', {
    method: 'POST',
    data: params
  })
}
// 获取门店列表
export async function getShopList (params) {
  return request('/shop/getShopsByOwner', {
    method: 'GET',
    params
  })
}
// 创建新的门店
export async function creatShop (params) {
  return request('/shop/creatShop', {
    method: 'POST',
    data: params
  })
}

// 修改门店信息
export async function updateShopInfo (params) {
  return request('/shop/updateShop', {
    method: 'POST',
    data: params
  })
}