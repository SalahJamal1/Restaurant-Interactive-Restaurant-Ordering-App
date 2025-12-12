"use client";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

function ProtectPage({ children }) {
  const { Auth, loader } = useSelector((store) => store.user);
  const [mount, setMount] = useState(true);

  const router = useRouter();
  useEffect(
    function () {
      if (Auth === false) router.push("/");
      setMount(false);
    },
    [Auth, router]
  );

  if (loader || mount || Auth === undefined) return <Spinner />;

  return Auth ? children : null;
}

export default ProtectPage;
