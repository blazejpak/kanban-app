"use client";

import Button from "@/components/ui/Button";
import { getBoard } from "@/lib/actions/board.action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

export default function Home() {
  const data = useAppSelector((state) => state.dataSlice.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const boards = await getBoard();
      dispatch({ type: "dataDB/getData", payload: boards });
    };

    fetchData();
  }, []);

  return (
    <section className="min-h-full flex flex-col justify-center items-center gap-4 text-center ">
      <h2 className="text-lg font-bold text-[#828FA3] ">
        You don't have any boards yet. Create a new one to get started.
      </h2>
      <Button
        onClick={() => {}}
        text="Create a Board"
        plus={false}
        disabled={false}
      />
    </section>
  );
}
