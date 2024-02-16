"use client";

import HomePage from "@/components/main/HomePage";
import TypeForms from "@/components/main/TypeForms";
import { getBoard } from "@/lib/actions/board.action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

export default function Home() {
  const dispatch = useAppDispatch();
  const [spinner, setSpinner] = useState<boolean>(true);

  const activePage = useAppSelector(
    (state) => state.activeBoardSlice.activeBoard,
  );

  const pageLocal = localStorage.getItem("activePage");

  useEffect(() => {
    setSpinner(true);
    const fetchData = async () => {
      const boards: any = await getBoard();

      dispatch({ type: "dataDB/getData", payload: boards });
      if (boards.find((item: any) => item._id === pageLocal) === undefined) {
        if (boards.length === 0)
          dispatch({ type: "activeBoard/payloadBoard", payload: "" });
        else
          dispatch({
            type: "activeBoard/payloadBoard",
            payload: boards[0]._id,
          });
      } else if (boards.length > 0 && !activePage && !pageLocal) {
        dispatch({ type: "activeBoard/payloadBoard", payload: boards[0]._id });
      } else if (pageLocal) {
        dispatch({ type: "activeBoard/payloadBoard", payload: pageLocal });
      }
      setSpinner(false);
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setSpinner(false);
  //   }, 1000);
  // }, []);

  return (
    <section className={`relative flex min-h-full w-full flex-col  `}>
      {spinner ? (
        <div className="flex h-screen w-full items-center justify-center ">
          <RotatingLines
            visible={true}
            width="180"
            strokeColor="#635FC7"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      ) : (
        <HomePage />
      )}
      <TypeForms />
    </section>
  );
}
