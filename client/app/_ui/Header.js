import Logo from "./Logo";
import Navigation from "./Navigation";

function Header() {
  return (
    <>
      <header className="bg-black border-b border-slate-200 shadow-lg h-[14vh] z-10">
        <nav className="max-w-7xl mx-auto py-3 flex items-center justify-between">
          <Logo />
          <Navigation />
        </nav>
      </header>
    </>
  );
}

export default Header;
