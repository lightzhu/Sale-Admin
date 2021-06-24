import request from "@/utils/request";
export async function query (params) {
  return request("/admin/all", {
    method: 'GET',
    params
  });
}
export async function queryCurrent (params) {
  return request("/admin/adminInfo", {
    method: 'GET',
    params
  });
}

export async function updateAdminInfo (data) {
  return request("/admin/updateInfo", {
    method: 'POST',
    data
  })
}
export async function updateAvatar (data) {
  return request("/admin/update/avatar", {
    method: 'POST',
    requestType: 'form',
    data
  })
}
// export async function updateAvatar (data) {
//   debugger
//   return requestFile("http://localhost:8099/admin/updateAvatar", data);
// }
export async function queryNotices () {
  return request("/notices");
}
export async function queryProvince () {
  return request("/user/province");
}
export async function queryCity (province) {
  return request(`/user/city/${province}`);
}
