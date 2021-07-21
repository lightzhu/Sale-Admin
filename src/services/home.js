import request from '@/utils/request'
export async function getSaleInfo () {
  return request('/shop/saleInfo')
}
export async function getHomeBills () {
  return request('/home/homeBills')
}
export async function getRepertory () {
  return request('/home/getRepertory')
}
// export async function getRepertory () {
//   return request('/shop/saleInfo')
// }

