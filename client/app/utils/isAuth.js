import { validToken } from "../_lib/apiAuth";

export function isAuth() {
  if (typeof window === "undefined") return false;
  const jwt = validToken();
  return !!jwt;
}
