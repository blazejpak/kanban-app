"use client";

import { deleteBoard, getBoard } from "@/lib/actions/board.action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface Props {
  activeMenu: boolean;
}

const DeleteBoard = ({ activeMenu }: Props) => {
  const dispatch = useAppDispatch();

  const activePage = useAppSelector(
    (state) => state.activeBoardSlice.activeBoard,
  );

  const deleteBoardHandler = async () => {
    await deleteBoard(activePage);
    const boards: any = await getBoard();
    dispatch({ type: "dataDB/getData", payload: boards });
    dispatch({ type: "activeMenu/toggleDeleteBoard" });
    dispatch({ type: "activeBoard/payloadBoard", payload: boards[0]._id });
  };

  return (
    <div
      className={`${
        activeMenu && "sm:translate-x-[-100px] md:translate-x-[0]"
      } pointer-events-auto absolute z-40 h-fit w-[340px] rounded-md bg-white  p-8 text-start opacity-100 dark:bg-[#2B2C37] sm:w-[480px]`}
    >
      {/* For new Board */}
      <div className="flex h-full w-full flex-col gap-6 ">
        <h3 className=" text-lg font-bold text-red-500">Delete this board?</h3>
        <p>
          Are you sure you want to delete the ‘Platform Launch’ board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 font-bold sm:flex-row">
          <button
            onClick={deleteBoardHandler}
            className="h-10 w-52 rounded-3xl bg-[#EA5555] transition-all first-letter:uppercase hover:bg-[#FF9898]"
          >
            delete
          </button>
          <button
            onClick={() => dispatch({ type: "activeMenu/toggleDeleteBoard" })}
            className="h-10 w-52 rounded-3xl bg-[#635FC71A] transition-all first-letter:uppercase hover:bg-[#635FC740] dark:bg-white dark:text-[#635FC7] dark:hover:bg-white/75"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBoard;
