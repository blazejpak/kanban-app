import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CheckTask from "../groups/CheckTask/CheckTask";
import { useEffect, useState } from "react";

interface Task {
  task: string;
  description: string;
  subtasks: Array<any>;
  status: string;
  id: string;
}

const ColumnTask = ({ task, description, status, subtasks, id }: Task) => {
  const dispatch = useAppDispatch();
  const [checkTaskBoxId, setCheckTaskBoxId] = useState<string>("");

  const activeMenu = useAppSelector(
    (state) => state.activeMenuSlice.isActiveMenu,
  );
  const checkTaskBox = useAppSelector(
    (state) => state.activeMenuSlice.checkTask,
  );

  useEffect(() => {
    if (!checkTaskBox) setCheckTaskBoxId("");
  }, [checkTaskBox]);

  const numberOfSubtasksDone = subtasks.reduce((acc, subtask) => {
    if (subtask.status) acc++;
    return acc;
  }, 0);

  return (
    <div>
      <div
        className="group flex h-fit w-full cursor-pointer flex-col gap-1 rounded-lg bg-white py-6 pl-4 font-bold first-letter:uppercase dark:bg-[#2B2C37]"
        onClick={() => {
          dispatch({ type: "activeMenu/toggleCheckTask" });
          setCheckTaskBoxId(id);
        }}
      >
        <h2 className=" group-hover:text-[#635FC7]">{task}</h2>
        <p className="text-xs text-[#828FA3]">{`${numberOfSubtasksDone} of ${subtasks.length} subtasks`}</p>
      </div>

      {/* CLICKED TASK*/}
      {checkTaskBox && checkTaskBoxId === id && (
        <CheckTask
          check={checkTaskBoxId}
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
