"use client";
import { useEffect, useState } from "react";
import ProtectPage from "../_components/ProtectPage";
import SideBar from "../_components/SideBar";

function Layout({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="grid grid-cols-[auto,1fr] gap-12">
      <ProtectPage>
        <SideBar />
        <div className="pt-4">{children}</div>
      </ProtectPage>
    </div>
  );
}

export default Layout;
