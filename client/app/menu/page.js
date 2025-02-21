import { Suspense } from "react";
import Filter from "../_components/Filter";
import MenuList from "../_components/MenuList";
import Spinner from "../_components/Spinner";
export const metadata = {
  title: "Menu - RestoNest",
};
async function Page({ searchParams }) {
  const item = (await searchParams?.item) ?? "pizza";
  return (
    <div className="py-12">
      <div className="flex items-center flex-col">
        <span className="block text-base border-y border-[#FF9900] text-[#292E36] tracking-[2px] mb-4 capitalize">
          menu
        </span>
        <h2 className="mb-8 text-4xl tracking-widest">Popular Dishes</h2>
        <Filter />
        <Suspense fallback={<Spinner />} key={item}>
          <MenuList item={item} />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
