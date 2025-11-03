import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_ENVIRONMENT === "docker"
      ? process.env.NEXT_PUBLIC_API_URL
      : "http://localhost:8080/api/v1/",
  withCredentials: true,
});
export async function getMenu(category) {
  try {
    const res = await api.get(`items?category=${category}`);
    return res;
  } catch (err) {
    const message = !err?.message
      ? "Unable to load data. Please try again later"
      : err.message;
    throw new Error(message);
  }
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
export async function getCurrent(signal) {
  const res = await api.post("auth/refresh-token", null, { signal });
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
