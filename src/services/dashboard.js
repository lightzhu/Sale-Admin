import request from '@/utils/request';

export async function fakeChartData() {
  return request('/fake_chart_data');
}
