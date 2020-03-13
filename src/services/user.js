import request from "@/utils/request";
export async function query() {
  return request("/api/users");
}
export async function queryCurrent() {
  return request("/api/currentUser");
}
export async function queryNotices() {
  return request("/api/notices");
}
export async function queryProvince() {
  return request("/api/province");
}
export async function queryCity(province) {
  return request(`/api/city/${province}`);
}
