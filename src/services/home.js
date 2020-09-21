import request from '@/utils/request'
export async function getSummary() {
  return request('/home/homeSum')
}
export async function getHomeBills() {
  return request('/home/homeBills')
}
export async function getRepertory() {
  return request('/home/getRepertory')
}

