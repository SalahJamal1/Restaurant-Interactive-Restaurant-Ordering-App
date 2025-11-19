import Logo from "./Logo";
import Navigation from "./Navigation";
import UserLoader from "./UserLoader";

function Header() {
  return (
    <>
      <UserLoader />
      <header className="bg-black border-b border-slate-200 shadow-lg h-[14vh]">
        <nav className="max-w-7xl mx-auto py-3 flex items-center justify-between">
          <Logo />
          <Navigation />
        </nav>
      </header>
    </>
  );
}

export default Header;
