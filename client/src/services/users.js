import { api, createHeaders } from "./index";

export const verify = async () => {
  try {
    const resp = await api.get('/auth/verify', createHeaders());
    return resp.data.user;
  } catch (e) {
    console.log(e);
  }
}
