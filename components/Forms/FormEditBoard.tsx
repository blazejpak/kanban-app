"use client";

import { useState } from "react";

import { editBoard, getBoard } from "@/lib/actions/board.action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LineWave } from "react-loader-spinner";

const FormEditBoard = () => {
  const dispatch = useAppDispatch();

  const [spinner, setSpinner] = useState<boolean>(false);
  const [submitClicked, setSubmitClicked] = useState<boolean>(false);

  const activePage = useAppSelector(
    (state) => state.activeBoardSlice.activeBoard,
  );
  const data: any = useAppSelector((state) => state.dataSlice.data);
  const activeData = data.find((item: any) => item._id === activePage);

  const [fillNameError, setFillNameError] = useState<boolean>(false);

  const [boardName, setBoardName] = useState<string>(activeData.name);

  const submitForm = async (e: any) => {
    e.preventDefault();

    try {
      if (!boardName) {
        setFillNameError(true);
        return;
      } else if (!submitClicked) {
        setSubmitClicked(true);
        setSpinner(true);

        await editBoard(activePage, boardName);
        const boards: any = await getBoard();
        dispatch({ type: "dataDB/getData", payload: boards });
        dispatch({ type: "activeMenu/toggleEditBoard" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitClicked(false);
      setSpinner(false);
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="flex h-full w-full flex-col justify-between gap-4"
    >
      <div className="flex flex-col gap-4">
        <label htmlFor="boardName" className="text-xs font-bold text-[#828FA3]">
          Board Name
        </label>
        <div className="relative ">
          {fillNameError && !boardName ? (
            <p
              className={`${
                fillNameError && !boardName
              } absolute right-6 top-[50%] translate-y-[-50%] text-xs text-red-600`}
            >
              Can't be empty
            </p>
          ) : null}
          <input
            id="boardName"
            type="text"
            className={`${
              fillNameError && !boardName
                ? "border-red-600"
                : "border-[#828FA340]"
            } h-10 w-full rounded-lg border bg-inherit p-4 outline-none`}
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
            {activeData.columns.map((item: any) => {
              return (
                <div
                  key={item.nameColumn}
                  className="flex h-10 w-full items-center rounded-lg border border-[#828FA340]  bg-inherit p-4 "
                >
                  <p className="text-sm font-bold">{item.nameColumn}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {spinner && (
          <div className="self-center">
            <LineWave
              visible={true}
              height="100"
              width="100"
              color="#635FC7"
              ariaLabel="line-wave-loading"
            />
          </div>
        )}
        <button
          type="submit"
          className="flex w-full  items-center justify-center rounded-3xl bg-[#635FC7] px-4 py-2 font-bold text-white transition-all hover:bg-[#A8A4FF] "
        >
          Save Board Name
        </button>
      </div>
    </form>
  );
};

export default FormEditBoard;
