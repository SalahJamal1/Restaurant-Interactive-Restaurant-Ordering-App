"use client";
import { useDispatch, useSelector } from "react-redux";
import { refresh, validToken } from "@/app/_lib/apiAuth";
import { getUser, Loader } from "@/app/_components/account/userSlice";
import { useEffect } from "react";
import Spinner from "./Spinner";

function UserLoader() {
  const dispatch = useDispatch();
  const { loader, Auth } = useSelector((store) => store.user);
  useEffect(
    function () {
      const token = validToken();
      if (!token) return;
      dispatch(Loader());
      const controller = new AbortController();
      (async () => {
        try {
          const res = await refresh(controller.signal);
          dispatch(getUser(res.data.user));
          localStorage.setItem("jwt", res.data.access_token);
        } catch (err) {
          if (err.code !== "ERR_CANCELED" && err.name !== "CanceledError") {
            console.log(err);
          }
        }
      })();

      return () => controller.abort();
    },
    [dispatch]
  );
  return null;
}

export default UserLoader;
