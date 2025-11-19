const { api } = require("./apiAuth");

export async function createOrders(data) {
  try {
    const res = await api.post("payments/create-session", data);
    return res;
  } catch (err) {
    console.log(err);
  }
}
export async function GetOrders(signal) {
  const res = await api.get("/orders", { signal });
  return res;
}
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
