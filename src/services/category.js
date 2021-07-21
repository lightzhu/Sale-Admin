import request from '@/utils/request'
// 获取店铺id
export async function getGoodCategory (params) {
  return request('/goods/category/sublist', {
    method: 'GET',
    params
  })
}
// 获取门店列表
export async function getCategoryist (params) {
  return request('/goods/category/list', {
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