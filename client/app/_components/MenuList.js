"use client";
import { Suspense, useEffect, useState } from "react";
import { getMenu } from "../_lib/apiResto";
import MenuCard from "./MenuCard";
import Error from "../error";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

function MenuList({ item }) {
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(
    function () {
      async function fetchMenu() {
        try {
          const res = await getMenu(item);
          if (!res?.data) throw new Error("Failed to receive response 404");
          setMenu(res.data);
        } catch (err) {
          console.log(err);
          setError("Failed to receive response 404");
        }
      }
      fetchMenu();
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
        {menu.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </ul>
    </Suspense>
  );
}

export default MenuList;
