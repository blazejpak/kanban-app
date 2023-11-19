"use client";

import AddBoard from "@/components/groups/AddBoard";
import AddColumn from "@/components/groups/AddColumn";
import DeleteBoard from "@/components/groups/DeleteBoard";
import Button from "@/components/ui/Button";
import { getBoard } from "@/lib/actions/board.action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const backdropRef = useRef<HTMLElement | any>();

  const dispatch = useAppDispatch();
  const activePage = useAppSelector(
    (state) => state.activeBoardSlice.activeBoard,
  );
  const activeMenu = useAppSelector(
    (state) => state.activeMenuSlice.isActiveMenu,
  );
  const activeForm = useAppSelector(
    (state) => state.activeMenuSlice.isActiveForm,
  );
  const typeForm = useAppSelector((state) => state.activeMenuSlice.whatType);
  const deleteBoard = useAppSelector(
    (state) => state.activeMenuSlice.deleteBoard,
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

  let infoParagraph =
    "You don't have any boards yet. Create a new one to get started.";
  let textButton = `Create a Board`;

  const data = useAppSelector((state) => state.dataSlice.data);

  if (data.length > 0) {
    infoParagraph = "This board is empty. Create a new column to get started.";
    textButton = `+ Add New Column`;
  }

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (activeForm) {
        if (!backdropRef.current) return;
        else if (!backdropRef.current.contains(event.target) && activeForm) {
          dispatch({ type: "activeMenu/toggleForm" });
          event.stopPropagation();
        }
      }
      return;
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [activeForm]);

  const element = document.querySelector<any>("html");
  if (activeForm || deleteBoard) {
    element.style.pointerEvents = "none";
  }
  if (!activeForm && !deleteBoard) {
    element.style.pointerEvents = "auto";
  }

  const resetDivHandler = () => {
    dispatch({ type: "activeMenu/toggleForm" });
  };

  return (
    <section
      className={`relative  flex min-h-full flex-col items-center justify-center gap-4 text-center  `}
    >
      <h2 className="text-lg font-bold text-[#828FA3] ">{infoParagraph}</h2>
      <Button
        onClick={() => {
          dispatch({ type: "activeMenu/toggleForm" });
          if (data.length === 0)
            dispatch({ type: "activeMenu/typeForm", payload: "board" });
          else dispatch({ type: "activeMenu/typeForm", payload: "column" });
        }}
        text={textButton}
        plus={false}
        disabled={false}
      />
      {activeForm && (
        <>
          <div
            className={`absolute z-30 h-full w-full backdrop-brightness-50`}
          ></div>
          {typeForm === "board" ? (
            <AddBoard
              activeMenu={activeMenu}
              backdropRef={backdropRef}
              resetDivHandler={resetDivHandler}
            />
          ) : (
            <AddColumn
              activeMenu={activeMenu}
              backdropRef={backdropRef}
              resetDivHandler={resetDivHandler}
            />
          )}
        </>
      )}

      {deleteBoard && (
        <>
          <div
            className={`absolute z-30 h-full w-full backdrop-brightness-50`}
          ></div>
          <DeleteBoard activeMenu={activeMenu} />
        </>
      )}
    </section>
  );
}
