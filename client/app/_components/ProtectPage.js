"use client";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

function ProtectPage({ children }) {
  const { Auth, loader } = useSelector((store) => store.user);
  const router = useRouter();
  useEffect(
    function () {
      if (!Auth && !loader) {
        router.push("/");
      }
    },
    [Auth, router, loader]
  );
  if (loader) return <Spinner />;

  return Auth ? children : null;
}

export default ProtectPage;
