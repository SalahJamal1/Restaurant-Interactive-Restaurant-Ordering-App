import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_ENVIRONMENT === "docker"
      ? process.env.NEXT_PUBLIC_API_URL
      : "http://localhost:8080/api/v1/",
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("jwt");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (err) => Promise.reject(err)
);
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
export async function refresh(signal) {
  const res = await api.post("auth/refresh-token", null, { signal });
  return res;
}
