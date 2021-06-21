import request from '@/utils/request'
export async function getSummary () {
  return request('/bill/count')
}
export async function getHomeBills () {
  return request('/home/homeBills')
}
export async function getRepertory () {
  return request('/home/getRepertory')
}

