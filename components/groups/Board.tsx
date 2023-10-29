"use client";

import ButtonLink from "../ui/ButtonLink";

import { useEffect, useRef, useState } from "react";
import { getBoard } from "@/lib/actions/board.action";

const Board = () => {
  const [board, setBoard] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const boards = await getBoard();
      setBoard(boards);
    };

    fetchData();
  }, []);

  return (
    <>
      <h2 className="uppercase tracking-wide text-xs p-5">All boards</h2>
      <ul>
        {board.map((link) => (
          <li key={link._id}>
            <ButtonLink active={link._id} text={link.name} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Board;
