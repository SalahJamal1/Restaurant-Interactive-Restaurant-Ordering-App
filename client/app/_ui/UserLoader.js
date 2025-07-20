"use client";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "@/app/_lib/apiResto";
import { getUser, Loader } from "@/app/_components/account/userSlice";
import { useEffect } from "react";
import { isAuth } from "../utils/isAuth";

function UserLoader() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  useEffect(
    function () {
      if (!user?.firstName) {
        async function getCurrentUser() {
          dispatch(Loader());
          try {
            if (isAuth()) {
              const res = await getCurrent();
              dispatch(getUser(res.data));
            }
          } catch (err) {
            console.log(err);
          }
        }
        getCurrentUser();
      }
    },
    [dispatch, user]
  );
  return null;
}

export default UserLoader;
