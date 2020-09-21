import request from '@/utils/request';

export async function queryFakeList(params) {
  return request('/order/fake_list', {
    params,
  });
}
