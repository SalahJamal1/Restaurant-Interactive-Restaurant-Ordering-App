"use client";
import { useEffect, useState } from "react";
import ProtectPage from "../_ui/ProtectPage";
import SideBar from "../_ui/SideBar";

function Layout({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`grid grid-cols-[60rem] place-content-center`}>
      <ProtectPage>
        <SideBar />
        <div className="pt-12 pl-10 overflow-scroll">{children}</div>
      </ProtectPage>
    </div>
  );
}

export default Layout;
