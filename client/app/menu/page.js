import { Suspense, use } from "react";
import Filter from "../_ui/Filter";
import Spinner from "../_ui/Spinner";
import { getMenu } from "../_lib/apiResto";
import MenuList from "../_components/menu/MenuList";
export const metadata = {
  title: "Menu - RestoNest",
};
function Page({ searchParams }) {
  const item = searchParams?.item ?? "pizza";
  const menu = use(getMenu(item))?.data;

  return (
    <div className="py-12">
      <div className="flex items-center flex-col">
        <span className="block text-base border-y border-[#FF9900] text-[#292E36] tracking-[2px] mb-4 capitalize">
          menu
        </span>
        <h2 className="mb-8 text-4xl tracking-widest">Popular Dishes</h2>
        <Filter />
        <Suspense fallback={<Spinner />} key={item}>
          <ul className="grid grid-cols-3 gap-8">
            {menu?.map((item) => (
              <MenuList key={item.id} item={item} />
            ))}
          </ul>
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
