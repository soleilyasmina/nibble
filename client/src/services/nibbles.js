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

export const lazyFollowingNibbles = async (last) => {
  try {
    const resp = await api.get(`/nibbles/following/lazy/${last.createdAt}`, createHeaders());
    return resp.data.nibbles;
  } catch (e) {
    console.log(e);
  }
}

export const allNibbles = async (user_id) => {
  try {
    const resp = await api.get(`/nibbles/users/${user_id}`, createHeaders());
    return resp.data.nibbles;
  } catch (e) {
    console.log(e);
  }
}

export const lazyAllNibbles = async (last) => {
  try {
    const resp = await api.get(`/nibbles/users/${last.user_id._id}/lazy/${last.createdAt}`, createHeaders());
    return resp.data.nibbles;
  } catch (e) {
    console.log(e);
  }
}

export const myNibbles = async () => {
  try {
    const resp = await api.get("/nibbles", createHeaders());
    return resp.data.nibbles;
  } catch (e) {
    console.log(e);
  }
}

export const oneNibble = async (id) => {
  try {
    const resp = await api.get(`/nibbles/${id}`, createHeaders());
    return resp.data;
  } catch (e) {
    console.log(e);
  }
}
