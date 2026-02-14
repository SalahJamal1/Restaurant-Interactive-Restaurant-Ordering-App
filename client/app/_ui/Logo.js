import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
function Logo() {
  return (
    <div className="flex items-center justify-center flex-col">
      <Link href="/">
        <Image src={logo} className="w-20 h-16 loaded" alt="logo" />
      </Link>
      <h2 className="text-[#95713A]  font-bold text-xl">RestoNest</h2>
    </div>
  );
}

export default Logo;
