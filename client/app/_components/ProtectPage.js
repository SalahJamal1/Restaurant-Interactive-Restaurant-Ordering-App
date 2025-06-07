"use client";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

function ProtectPage({ children }) {
  const { Auth } = useSelector((store) => store.user);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const router = useRouter();
  useEffect(
    function () {
      if (Auth === undefined) return;
      if (!Auth) {
        router.push("/");
      }
      setIsAuthChecked(true);
    },
    [Auth, router]
  );
  if (!isAuthChecked) return <Spinner />;

  return isAuthChecked ? children : null;
}

export default ProtectPage;
