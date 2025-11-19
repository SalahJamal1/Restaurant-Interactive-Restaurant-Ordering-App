import Image from "next/image";
import Link from "next/link";
import image from "@/public/Image.png";
export const metadata = {
  title: "RestoNest",
};
function Page() {
  return (
    <div className="grid grid-cols-2 h-[86vh]  items-center justify-center">
      <div className="flex flex-col">
        <h2 className="text-6xl font-bold tracking-wide mb-8">
          Welcome to <span className="text-[#FF9900]">RestoNest</span>
        </h2>
        <p className="text-xl max-w-[492px] mb-10 text-[#555555]">
          Simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy .
        </p>
        <Link
          href="/menu"
          className="bg-black text-[#FFF7EA] py-4 px-12 rounded-md text-xl place-self-start"
        >
          View Menu
        </Link>
      </div>
      <Image
        placeholder="blur"
        src={image}
        alt="image"
        className="max-h-[480px] opacity-75"
      />
    </div>
  );
}

export default Page;
