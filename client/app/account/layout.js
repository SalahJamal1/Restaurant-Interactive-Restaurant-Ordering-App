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
    <div className="grid grid-cols-[auto,1fr] gap-12">
      <ProtectPage>
        <SideBar />
        <div className="pt-4">{children}</div>
      </ProtectPage>
    </div>
  );
}

export default Layout;
