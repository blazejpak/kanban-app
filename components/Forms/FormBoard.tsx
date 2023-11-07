"use client";

import Image from "next/image";
import { useState } from "react";

import removeIcon from "@/public/assets/icon-cross.svg";
import { createBoard, getBoard } from "@/lib/actions/board.action";
import { useAppDispatch } from "@/store/hooks";

const FormBoard = ({ resetDiv }: any) => {
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
    console.log(index);

    setColumns(columns.filter((column) => column.id !== index));
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    // TODO
    const columnsName = columns.map((column) => column.name);
    console.log(columnsName);
    await createBoard(boardName, ...columnsName);
    const boards: any = await getBoard();
    dispatch({ type: "dataDB/getData", payload: boards });
    resetDiv();
  };

  return (
    <form
      onSubmit={submitForm}
      className="flex flex-col gap-4 w-full h-full justify-between"
    >
      <div className="flex flex-col gap-4">
        <div>
          <label className="font-bold text-xs">Board Name</label>
          <input
            type="text"
            className="w-full h-10 bg-inherit border border-[#828FA340] rounded-lg outline-none p-4"
            placeholder="e.g. Web Design"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
        </div>
        <div>
          <label className="font-bold text-xs">Board Columns</label>
          <div className="flex flex-col gap-2 max-h-[140px] overflow-y-auto">
            {columns.map((item) => {
              return (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-full relative">
                    {fillColumnError && !item.name ? (
                      <p
                        className={`${
                          fillColumnError && !item.name
                        } absolute right-6 top-[50%] text-red-600 text-xs translate-y-[-50%]`}
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
                      } w-full h-10 bg-inherit border  rounded-lg outline-none p-4`}
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
                    className="cursor-pointer mr-2"
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
          className="bg-[#635FC71A] dark:bg-white dark:text-[#635FC7] text-white  px-4 py-2 sm:py-4 rounded-3xl flex justify-center items-center font-bold dark:hover:bg-white/75 hover:bg-[#635FC740] transition-all w-full"
          onClick={newColumnHandle}
        >
          + Add New Column
        </button>
        <button
          type="submit"
          className="bg-[#635FC7] text-white  px-4 py-2 sm:py-4 rounded-3xl flex justify-center items-center font-bold hover:bg-[#A8A4FF] transition-all w-full"
        >
          Create New Thread
        </button>
      </div>
    </form>
  );
};

export default FormBoard;
