import request from '@/utils/request';

export async function fakeChartData () {
  return request('/fake/chart_data');
}
