"use client";
import { useDispatch } from "react-redux";
import { refresh } from "@/app/_lib/apiAuth";
import { getUser, Loader } from "@/app/_components/account/userSlice";
import { useEffect } from "react";

function UserLoader() {
  const dispatch = useDispatch();
  useEffect(
    function () {
      const token = localStorage.getItem("jwt");
      const controller = new AbortController();
      if (token) {
        async function refreshToken() {
          dispatch(Loader());
          try {
            const res = await refresh(controller.signal);
            dispatch(getUser(res.data.user));
            localStorage.setItem("jwt", res.data.access_token);
          } catch (err) {
            if (err.name !== "CanceledError") console.log(err);
          }
        }
        refreshToken();
      }
      return () => controller.abort();
    },
    [dispatch]
  );
  return null;
}

export default UserLoader;
