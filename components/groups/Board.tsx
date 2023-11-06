import ButtonLink from "../ui/ButtonLink";

import { useAppSelector } from "@/store/hooks";

const Board = () => {
  const data = useAppSelector((state) => state.dataSlice.data);

  return (
    <div>
      <h2 className="uppercase tracking-wide text-xs p-5 ">All boards</h2>
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
