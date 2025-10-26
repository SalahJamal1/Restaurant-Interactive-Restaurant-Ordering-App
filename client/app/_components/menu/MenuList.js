"use client";
import { Suspense, useEffect, useState } from "react";
import MenuCard from "./MenuCard";

import { useRouter } from "next/navigation";
import { getMenu } from "@/app/_lib/apiResto";
import Error from "@/app/error";
import Spinner from "@/app/_ui/Spinner";

function MenuList({ item }) {
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMenu() {
        try {
          const res = await getMenu(item, controller.signal);
          if (!res?.data) throw new Error("Failed to receive response 404");
          setMenu(res?.data);
        } catch (err) {
          if (err.name !== "CanceledError") {
            setError("Failed to receive response 404");
            console.log(err);
          }
        }
      }
      fetchMenu();
      return () => controller.abort();
    },
    [item]
  );
  if (error)
    return (
      <Error
        error={error}
        reset={() => {
          router.refresh();
        }}
      />
    );
  return (
    <Suspense fallback={<Spinner />} key={item}>
      <ul className="grid grid-cols-3 gap-8">
        {menu?.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </ul>
    </Suspense>
  );
}

export default MenuList;
