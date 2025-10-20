import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_ENVIRONMENT === "docker"
      ? process.env.NEXT_PUBLIC_API_URL
      : "http://localhost:8080/api/v1/",
  withCredentials: true,
});
export async function getMenu(category) {
  const res = await api.get(`items?category=${category}`);
  return res;
}
export async function signIn(data) {
  const res = await api.post("auth/login", data);
  return res;
}
export async function signOut() {
  const res = await api.get("auth/logout");
  console.log(res);
  return res;
}

export async function signup(data) {
  const res = await api.post("auth/signup", data);
  return res;
}
export async function getCurrent() {
  const res = await api.post("auth/refresh-token");
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
