"use client";
import { useDispatch } from "react-redux";
import { getCurrent } from "@/app/_lib/apiResto";
import { getUser, Loader } from "@/app/_components/account/userSlice";
import { useEffect } from "react";
import { isAuth } from "../utils/isAuth";

function UserLoader() {
  const dispatch = useDispatch();
  useEffect(
    function () {
      const token = localStorage.getItem("jwt");

      if (token) {
        async function getCurrentUser() {
          dispatch(Loader());
          try {
            if (isAuth()) {
              const res = await getCurrent();
              dispatch(getUser(res.data.user));
              localStorage.setItem("jwt", res.data.access_token);
            }
          } catch (err) {
            console.log(err);
          }
        }
        getCurrentUser();
      }
    },
    [dispatch]
  );
  return null;
}

export default UserLoader;
