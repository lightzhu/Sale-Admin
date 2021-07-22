import request from '@/utils/request'
// 获取一级类目
export async function getGoodCategory (params) {
  return request('/goods/category/sublist', {
    method: 'GET',
    params
  })
}
// 获取所有分类列表
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
// 根据店铺一级类目id 获取二级类目
export async function getProductCategory (params) {
  return request('/goods/productCategory', {
    method: 'GET',
    params
  })
}