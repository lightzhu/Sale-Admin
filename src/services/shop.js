import request from '@/utils/request'
// 获取店铺id
export async function getShopById(params) {
  return request('/v1/shop/getShopById', {
    method: 'POST',
    data: params
  })
}
// 获取门店列表
export async function getShopList(params) {
  return request('/shop/getShopListById', {
    method: 'POST',
    data: params
  })
}
// 创建新的门店
export async function creatShop(params) {
  return request('/v1/shop/createShop', {
    method: 'POST',
    data: params
  })
}

// 修改门店信息
export async function updateShopInfo(params) {
  return request('/v1/shop/updateShop', {
    method: 'POST',
    data: params
  })
}
// export async function submitAdvanceInfo(params) {
//   return request('/v1/product/advanceInfo', {
//     method: 'POST',
//     data: params
//   })
// }