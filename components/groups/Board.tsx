import ButtonLink from "../ui/ButtonLink";

import { useAppSelector } from "@/store/hooks";

const Board = () => {
  const data = useAppSelector((state) => state.dataSlice.data);

  return (
    <div className=" sm:h-[60vh] overflow-auto">
      <h2 className=" uppercase font-bold tracking-widest text-xs p-5 ">
        All boards ({data.length})
      </h2>
      <ul>
        {data.map((link) => (
          <li key={link._id}>
            <ButtonLink active={link._id} text={link.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Board;
