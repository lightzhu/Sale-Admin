import request from '@/utils/request'
export async function getSummary() {
  return request('/api/homeSum')
}
