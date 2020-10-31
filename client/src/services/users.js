import { api, createHeaders } from "./index";

export const verify = async () => {
  try {
    const resp = await api.get('/auth/verify', createHeaders());
    return resp.data.user;
  } catch (e) {
    console.log(e);
  }
}

export const search = async (query) => {
  try {
    const resp = await api.post('/users/search', { query }, createHeaders());
    return resp.data.users;
  } catch (e) {
    console.log(e);
  }
}

export const getUserInfo = async (id) => {
  try {
    const resp = await api.get(`/users/${id}/info`, createHeaders());
    return resp.data.user;
  } catch (e) {
    console.log(e);
  }
}
