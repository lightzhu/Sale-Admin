import request from '@/utils/request'
export async function getSummary() {
  return request('/api/homeSum')
}
export async function getHomeBills() {
  return request('/api/homeBills')
}
export async function getRepertory() {
  return request('/api/getRepertory')
}
