import Image from "next/image";
import Link from "next/link";
import image from "@/public/Image 2.png";

export const metadata = {
  title: "About",
};

function Page() {
  return (
    <div className="grid grid-cols-2 items-center justify-center h-[86vh] gap-24">
      <div className="flex flex-col items-start">
        <span className="block text-base border-y border-[#FF9900] text-[#292E36] tracking-[2px] mb-4">
          About us
        </span>
        <h2 className="text-4xl text-[#292E36] font-bold tracking-wide mb-2">
          Quality and Tradition
        </h2>
        <p className="text-xl text-[#555555] max-w-[599px] mb-6">
          Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content gfshere making
          look like readable English. Many desktop publishing packages.
        </p>
        <Link
          href="/menu"
          className="bg-[#FF9900] text-[#FFF7EA] py-4 px-12 rounded-md text-xl"
        >
          See More
        </Link>
      </div>

      <Image
        placeholder="blur"
        className=" justify-self-end"
        src={image}
        alt="image"
        onLoad={(e) => e.currentTarget.classList.add("loaded")}
      />
    </div>
  );
}

export default Page;
