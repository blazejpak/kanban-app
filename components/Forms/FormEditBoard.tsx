"use client";

import Image from "next/image";
import { useState } from "react";

import removeIcon from "@/public/assets/icon-cross.svg";
import { createBoard, getBoard } from "@/lib/actions/board.action";
import { useAppDispatch } from "@/store/hooks";

// TODO everything in this file
const FormEditBoard = ({ resetDiv }: any) => {
  const dispatch = useAppDispatch();

  const [fillColumnError, setFillColumnError] = useState<boolean>(false);

  const [columns, setColumns] = useState<Array<any>>([
    { name: "Todo", id: Math.random() },
    { name: "Doing", id: Math.random() },
  ]);
  const [boardName, setBoardName] = useState<string>("");

  const newColumnHandle = () => {
    const newColumn = { name: "", id: Math.random() };
    if (columns.find((column) => column.name === "")) {
      setFillColumnError(true);
      return;
    } else {
      setFillColumnError(false);
      setColumns([...columns, newColumn]);
    }
  };

  const removeColumn = (index: number) => {
    setColumns(columns.filter((column) => column.id !== index));
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    const columnsName = columns.map((column) => column.name);
    await createBoard(boardName, ...columnsName);
    const boards: any = await getBoard();
    dispatch({ type: "dataDB/getData", payload: boards });
    dispatch({ type: "activeMenu/toggleForm" });
    resetDiv();
  };

  return (
    <form
      onSubmit={submitForm}
      className="flex h-full w-full flex-col justify-between gap-4"
    >
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-xs font-bold text-[#828FA3]">Board Name</label>
          <input
            type="text"
            className="h-10 w-full rounded-lg border border-[#828FA340] bg-inherit p-4 outline-none"
            placeholder="e.g. Web Design"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-[#828FA3]">
            Board Columns
          </label>
          <div className="flex max-h-[140px] flex-col gap-2 overflow-y-auto">
            {columns.map((item) => {
              return (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative w-full">
                    {fillColumnError && !item.name ? (
                      <p
                        className={`${
                          fillColumnError && !item.name
                        } absolute right-6 top-[50%] translate-y-[-50%] text-xs text-red-600`}
                      >
                        Can't be empty
                      </p>
                    ) : null}
                    <input
                      type="text"
                      className={`${
                        fillColumnError && !item.name
                          ? "border-red-600"
                          : "border-[#828FA340]"
                      } h-10 w-full rounded-lg border  bg-inherit p-4 outline-none`}
                      value={item.name}
                      onChange={(e) => {
                        const newName = e.target.value;
                        const updatedColumns = columns.map((column) => {
                          if (column.id === item.id) {
                            column.name = newName;
                          }
                          return column;
                        });
                        setColumns(updatedColumns);
                      }}
                    />
                  </div>
                  <div
                    onClick={() => removeColumn(item.id)}
                    className="mr-2 cursor-pointer"
                  >
                    <Image src={removeIcon} height={16} alt="Remove Icon" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button
          type="button"
          className="flex w-full items-center   justify-center rounded-3xl bg-[#635FC71A] px-4 py-2 font-bold text-[#635FC7] transition-all hover:bg-[#635FC740] dark:bg-white dark:hover:bg-white/75 sm:py-4"
          onClick={newColumnHandle}
        >
          + Add New Column
        </button>
        <button
          type="submit"
          className="flex w-full  items-center justify-center rounded-3xl bg-[#635FC7] px-4 py-2 font-bold text-white transition-all hover:bg-[#A8A4FF] sm:py-4"
        >
          Create New Thread
        </button>
      </div>
    </form>
  );
};

export default FormEditBoard;
