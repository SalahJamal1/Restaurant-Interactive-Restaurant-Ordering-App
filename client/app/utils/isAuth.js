export function isAuth() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("jwt");
}
