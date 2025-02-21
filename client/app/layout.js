"use client";
import { Josefin_Sans } from "next/font/google";
import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { Suspense } from "react";
import Spinner from "./_components/Spinner";
import { Provider } from "react-redux";
import { store } from "./_store/store";
import UserLoader from "./_components/UserLoader";
import CartOverView from "./_components/CartOverView";

const josefin = Josefin_Sans({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
});

function Layout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} relative text-slate-200 bg-white grid grid-rows-[auto_1fr_auto] h-screen`}
      >
        <Provider store={store}>
          <Suspense fallback={<Spinner />}>
            <UserLoader />
          </Suspense>
          <Header />
          <div className="overflow-y-scroll text-black bg-[#FFF7EA]">
            <main className="max-w-6xl mx-auto">{children}</main>
          </div>
          <CartOverView />
        </Provider>
      </body>
    </html>
  );
}

export default Layout;
