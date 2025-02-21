import ProtectPage from "../_components/ProtectPage";
import SideBar from "../_components/SideBar";

function Layout({ children }) {
  return (
    <div className="grid grid-cols-[auto,1fr] gap-12">
      <ProtectPage>
        <SideBar />
        <div className="pt-12">{children}</div>
      </ProtectPage>
    </div>
  );
}

export default Layout;
