import { deleteTask, getBoard } from "@/lib/actions/board.action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface Task {
  task: string;
  taskId: string;
  colId: string;
}

const DeleteTask = ({ task, taskId, colId }: Task) => {
  const dispatch = useAppDispatch();

  const activePage = useAppSelector(
    (state) => state.activeBoardSlice.activeBoard,
  );

  const deleteTaskHandler = async () => {
    await deleteTask(activePage, colId, taskId);
    const boards: any = await getBoard();
    dispatch({ type: "dataDB/getData", payload: boards });
    dispatch({ type: "activeMenu/toggleDeleteTask", payload: false });
    dispatch({ type: "activeMenu/toggleCheckTask" });
  };
  console.log(colId);
  return (
    <div
      className={` pointer-events-auto absolute left-[50%] top-[50%] z-[100] h-fit max-h-[80%] max-w-[300px] translate-x-[-50%]  translate-y-[-50%] overflow-y-auto rounded-md bg-white p-8 text-start opacity-100 shadow-2xl dark:bg-[#2B2C37] sm:w-[480px]`}
    >
      <div className="flex h-full w-full flex-col gap-6 ">
        <h3 className=" text-lg font-bold text-red-500">Delete this task?</h3>
        <p>
          Are you sure you want to delete the <span>{` '${task}' `}</span>
          Task? This action will remove task with all subtasks.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 font-bold sm:flex-row">
          <button
            onClick={deleteTaskHandler}
            className="h-10 w-52 rounded-3xl bg-[#EA5555] transition-all first-letter:uppercase hover:bg-[#FF9898]"
          >
            delete
          </button>
          <button
            onClick={() =>
              dispatch({
                type: "activeMenu/toggleDeleteTask",
                payload: false,
              })
            }
            className="h-10 w-52 rounded-3xl bg-[#635FC71A] transition-all first-letter:uppercase hover:bg-[#635FC740] dark:bg-white dark:text-[#635FC7] dark:hover:bg-white/75"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
