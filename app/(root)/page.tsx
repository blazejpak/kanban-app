"use client";

import FormBoard from "@/components/Forms/FormBoard";
import AddBoard from "@/components/groups/AddBoard";
import AddColumn from "@/components/groups/AddColumn";
import Button from "@/components/ui/Button";
import { getBoard } from "@/lib/actions/board.action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [activeDiv, setActiveDiv] = useState<boolean>(false);
  const backdropRef = useRef<HTMLElement | any>();

  const dispatch = useAppDispatch();
  const activePage = useAppSelector(
    (state) => state.activeBoardSlice.activeBoard,
  );
  const activeMenu = useAppSelector(
    (state) => state.activeMenuSlice.isActiveMenu,
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
      if (activeDiv) {
        if (!backdropRef.current) return;
        // if (!isActive) return;

        if (!backdropRef.current.contains(event.target) && activeDiv) {
          setActiveDiv(false);
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
  }, [activeDiv]);

  const element = document.querySelector<any>("html");
  if (activeDiv) {
    element.style.pointerEvents = "none";
  }
  if (!activeDiv) {
    element.style.pointerEvents = "auto";
  }

  const resetDivHandler = () => {
    setActiveDiv(false);
  };

  return (
    <section
      className={`relative  flex min-h-full flex-col items-center justify-center gap-4 text-center  `}
    >
      <h2 className="text-lg font-bold text-[#828FA3] ">{infoParagraph}</h2>
      <Button
        onClick={() => {
          dispatch({ type: "activeMenu/toggleForm" });
          setActiveDiv((state) => !state);
        }}
        text={textButton}
        plus={false}
        disabled={false}
      />
      {activeDiv && (
        <>
          <div
            className={`absolute z-30 h-full w-full backdrop-brightness-50`}
          ></div>
          {data.length === 0 ? (
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
    </section>
  );
}
