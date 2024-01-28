"use client";

import HomePage from "@/components/main/HomePage";
import TypeForms from "@/components/main/TypeForms";
import { getBoard } from "@/lib/actions/board.action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

import AddNewTask from "@/components/groups/AddNewTask";

export default function Home() {
  const dispatch = useAppDispatch();
  const activePage = useAppSelector(
    (state) => state.activeBoardSlice.activeBoard,
  );

  const pageLocal = localStorage.getItem("activePage");

  useEffect(() => {
    const fetchData = async () => {
      const boards: any = await getBoard();
      dispatch({ type: "dataDB/getData", payload: boards });

      if (boards.find((item: any) => item._id === pageLocal) === undefined) {
        dispatch({ type: "activeBoard/payloadBoard", payload: boards[0]._id });
      } else if (boards.length > 0 && !activePage && !pageLocal) {
        dispatch({ type: "activeBoard/payloadBoard", payload: boards[0]._id });
      } else if (pageLocal) {
        dispatch({ type: "activeBoard/payloadBoard", payload: pageLocal });
      }
    };

    fetchData();
  }, []);

  return (
    <section
      className={`relative flex min-h-full flex-col items-center justify-center gap-4  text-center `}
    >
      <HomePage />
      <TypeForms />
    </section>
  );
}
