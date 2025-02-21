import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  withCredentials: true,
});
export async function getMenu(item) {
  try {
    const res = await api.get(`menu/${item}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
export async function signIn(data) {
  try {
    const res = await api.post("auth/login", data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
export async function signOut() {
  try {
    const res = await api.get("auth/logout");
    return res;
  } catch (err) {
    console.log(err);
  }
}
export async function signup(data) {
  try {
    const res = await api.post("auth/signup", data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
export async function getCurrent() {
  try {
    const res = await api.get("auth/current");
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
