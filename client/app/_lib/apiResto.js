import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8080/api/v1/",
  withCredentials: true,
});
export async function getMenu(item) {
  const res = await api.get(`menu/${item}`);
  return res;
}
export async function signIn(data) {
  const res = await api.post("auth/login", data);

  return res;
}
export async function signOut() {
  const res = await api.get("auth/logout");
  return res;
}
export async function signup(data) {
  const res = await api.post("auth/signup", data);
  return res;
}
export async function getCurrent() {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) throw new Error("Your are'not Authenticated");
  const res = await api.get("auth/me", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}
export async function createOrders(data) {
  try {
    const res = await api.post("payments/create-session", data);
    return res;
  } catch (err) {
    console.log(err);
  }
}
