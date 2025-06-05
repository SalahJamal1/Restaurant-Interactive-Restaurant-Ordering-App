import axios from "axios";

const api = axios.create({
  // baseURL: "https://restsalah-4b5490310b95.herokuapp.com/api/v1/",
  baseURL: "http://127.0.0.1:8080/api/v1/",
  withCredentials: true,
});
export async function getMenu(item) {
  const res = await api.get(`menu/${item}`);
  return res;
}
export async function signIn(data) {
  const res = await api.post("auth/login", data);
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", res.data.token);
  }
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
  try {
    if (typeof window === "undefined") {
      throw new Error("localStorage is not available on the server");
    }

    const token = localStorage.getItem("jwt");
    if (token) {
      const res = await api.get("auth/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } else throw new Error("You are not authenticated");
  } catch (err) {
    console.log(err.message);
  }
}
export async function createOrders(data) {
  try {
    // const res = await api.post("/orders", data);
    const res = await api.post("payments/create-session", data);
    return res;
  } catch (err) {
    console.log(err);
  }
}
export async function deleteOrderById(id) {
  const res = await api.delete(`/orders/${id}`);
  return res;
}
