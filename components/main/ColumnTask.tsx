import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CheckTask from "../groups/CheckTask";

interface Task {
  task: string;
  description: string;
  subtasks: Array<any>;
  status: string;
  id: string;
}

const ColumnTask = ({ task, description, status, subtasks, id }: Task) => {
  const dispatch = useAppDispatch();

  const activeMenu = useAppSelector(
    (state) => state.activeMenuSlice.isActiveMenu,
  );
  const checkTaskBox = useAppSelector(
    (state) => state.activeMenuSlice.checkTask,
  );

  const numberOfSubtasksDone = subtasks.reduce((acc, subtask) => {
    if (subtask.status) acc++;
    return acc;
  }, 0);

  return (
    <div
      className="group flex h-fit w-full cursor-pointer flex-col gap-1 rounded-lg bg-white py-6 pl-4 font-bold first-letter:uppercase dark:bg-[#2B2C37]"
      onClick={() => {
        dispatch({ type: "activeMenu/toggleCheckTask" });
      }}
    >
      <h2 className=" group-hover:text-[#635FC7]">{task}</h2>
      <p className="text-xs text-[#828FA3]">{`${numberOfSubtasksDone} of ${subtasks.length} subtasks`}</p>

      {/* CLICKED TASK*/}
      {checkTaskBox && (
        <CheckTask
          task={task}
          description={description}
          status={status}
          subtasks={subtasks}
          activeMenu={activeMenu}
        />
      )}
    </div>
  );
};

export default ColumnTask;
