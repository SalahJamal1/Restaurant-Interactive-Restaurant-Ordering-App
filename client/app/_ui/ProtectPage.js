"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

function ProtectPage({ children }) {
  const { Auth, loader } = useSelector((store) => store.user);
  const [mount, setMount] = useState(true);

  const router = useRouter();
  useEffect(
    function () {
      if (Auth === undefined) return;
      if (Auth === false) router.push("/");
      setMount(false);
    },
    [Auth, router]
  );

  if (loader || mount) return <Spinner />;

  return Auth ? children : null;
}

export default ProtectPage;
