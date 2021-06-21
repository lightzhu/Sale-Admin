import request from "@/utils/request";
export async function query () {
  return request("/user/users");
}
export async function queryCurrent (params) {
  return request("/admin/adminInfo", {
    method: 'GET',
    params
  });
}
export async function queryNotices () {
  return request("/notices");
}
export async function queryProvince () {
  return request("/user/province");
}
export async function queryCity (province) {
  return request(`/user/city/${province}`);
}
