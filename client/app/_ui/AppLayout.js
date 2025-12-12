"use client";
import { Provider } from "react-redux";
import Header from "./Header";
import CartOverView from "../_components/cart/CartOverView";
import { store } from "../_store/store";
import { Suspense, useEffect, useState } from "react";
import Spinner from "./Spinner";
import UserLoader from "./UserLoader";

export default function AppLayout({ children }) {
  // const [mount, setMount] = useState(true);

  // useEffect(() => {
  //   setMount(false);
  // }, []);

  // if (mount) return <Spinner />;

  return (
    <Provider store={store}>
      <div className="grid grid-rows-[auto_1fr_auto] h-screen">
        <Suspense fallback={<Spinner />}>
          <UserLoader />
          <Header />

          <div className="overflow-y-scroll text-black bg-[#FFF7EA]">
            <main className="max-w-7xl mx-auto">{children}</main>
          </div>
          <CartOverView />
        </Suspense>
      </div>
    </Provider>
  );
}
