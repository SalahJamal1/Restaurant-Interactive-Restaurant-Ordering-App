import { getMenu } from "../_lib/apiResto";
import MenuCard from "./MenuCard";

async function MenuList({ item }) {
  const menu = await getMenu(item);

  return (
    <ul className="grid grid-cols-3 gap-8">
      {menu.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default MenuList;
