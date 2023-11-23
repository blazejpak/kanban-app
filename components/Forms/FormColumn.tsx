"use client";

import { useState } from "react";

import { addNewColumn, getBoard } from "@/lib/actions/board.action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const FormColumn = ({ resetDiv }: any) => {
  const dispatch = useAppDispatch();
  const activePage = useAppSelector(
    (state) => state.activeBoardSlice.activeBoard,
  );
  const data = useAppSelector((state) => state.dataSlice.data);
  const boardName = data.find((arr) => arr._id === activePage)?.name;
  const [fillColumnError, setFillColumnError] = useState<boolean>(false);

  const [column, setColumn] = useState<string>("Done");

  const submitForm = async (e: any) => {
    e.preventDefault();

    if (column === "") setFillColumnError(true);
    else {
      setFillColumnError(false);
      await addNewColumn(activePage, column);
      const boards: any = await getBoard();
      dispatch({ type: "dataDB/getData", payload: boards });
      dispatch({ type: "activeMenu/toggleForm" });
      resetDiv();
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="flex h-full w-full flex-col justify-between gap-4"
    >
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-xs font-bold text-[#828FA3]">Board Name</label>
          <h2 className="first-letter:uppercase ">{boardName}</h2>
        </div>
        <div>
          <label className="text-xs font-bold text-[#828FA3]">
            Board Column
          </label>
          <div className="flex max-h-[140px] flex-col gap-2 overflow-y-auto">
            <div className="flex items-center gap-4">
              <div className="relative w-full">
                {fillColumnError && !column ? (
                  <p
                    className={`${
                      fillColumnError && !column
                    } absolute right-6 top-[50%] translate-y-[-50%] text-xs text-red-600`}
                  >
                    Can't be empty
                  </p>
                ) : null}
                <input
                  type="text"
                  className={`${
                    fillColumnError && !column
                      ? "border-red-600"
                      : "border-[#828FA340]"
                  } h-10 w-full rounded-lg border  bg-inherit p-4 outline-none`}
                  value={column}
                  onChange={(e) => {
                    setColumn(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          className="flex w-full items-center   justify-center rounded-3xl bg-[#635FC71A] px-4 py-2 font-bold text-[#635FC7] transition-all hover:bg-[#635FC740] dark:bg-white dark:hover:bg-white/75 "
        >
          Add New Column
        </button>
      </div>
    </form>
  );
};

export default FormColumn;
