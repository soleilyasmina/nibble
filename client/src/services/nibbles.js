import { api, createHeaders } from "./index.js";

export const createNibble = async (data) => {
  try {
    await api.post("/nibbles", data, createHeaders());
  } catch (e) {
    console.log(e);
  }
}

export const createBite = async (data, id) => {
  try {
    await api.post(`/nibbles/${id}`, data, createHeaders());
  } catch (e) {
    console.log(e);
  }
}

export const followingNibbles = async () => {
  try {
    const resp = await api.get("/nibbles/following", createHeaders());
    return resp.data.nibbles;
  } catch (e) {
    console.log(e);
  }
};
