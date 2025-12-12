import ProtectPage from "../_ui/ProtectPage";
import SideBar from "../_ui/SideBar";

function Layout({ children }) {
  return (
    <div className={`grid grid-cols-[60rem] place-content-center relative`}>
      <ProtectPage>
        <SideBar />
        <div className="pt-12 pl-10 overflow-scroll">{children}</div>
      </ProtectPage>
    </div>
  );
}

export default Layout;
