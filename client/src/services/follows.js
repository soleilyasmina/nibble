import { api, createHeaders } from "./index.js";

export const follow = async (user_id) => {
  try {
    const resp = await api.post(`/users/${user_id}/follow`, {}, createHeaders());
    return resp.data.user;
  } catch (e) {
    console.log(e);
  }
}

export const unfollow = async (user_id) => {
  try {
    const resp = await api.delete(`/users/${user_id}/unfollow`, createHeaders());
    return resp.data.user;
  } catch (e) {
    console.log(e);
  }
}
