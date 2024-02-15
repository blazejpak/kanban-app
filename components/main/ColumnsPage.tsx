import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ColumnTask from "./ColumnTask";

const ColumnsPage = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.dataSlice.data);
  const activeBoard = useAppSelector(
    (state) => state.activeBoardSlice.activeBoard,
  );
  const activePageColumns = data.find(
    (board) => board._id === activeBoard,
  ).columns;

  interface Column {
    nameColumn: string;
    _id: string;
    tasks: Array<any>;
  }

  interface Task {
    task: string;
    description: string;
    subtasks: Array<any>;
    status: string;
    _id: string;
  }

  const activeMenu = useAppSelector(
    (state) => state.activeMenuSlice.isActiveMenu,
  );

  const addColumnHandle = () => {
    dispatch({ type: "activeMenu/typeForm", payload: "column" });
    dispatch({ type: "activeMenu/toggleForm" });
  };

  return (
    <div
      className={`flex max-h-[100dvh] flex-grow gap-6 overflow-x-auto overflow-y-hidden pl-6 pr-6 pt-20 ${
        activeMenu && `sm:ml-[255px] `
      }`}
    >
      {activePageColumns.map((column: Column) => {
        return (
          <ul
            key={column._id}
            className="flex  min-w-[280px] max-w-[300px] flex-col gap-5  overflow-y-auto pt-6"
          >
            <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-[#828FA3]">
              {`${column.nameColumn} (${column.tasks.length})`}
            </h3>
            {column.tasks.map((task: Task) => (
              <li key={task._id}>
                <ColumnTask
                  task={task.task}
                  description={task.description}
                  status={task.status}
                  subtasks={task.subtasks}
                  id={task._id}
                />
              </li>
            ))}
          </ul>
        );
      })}
      <div
        className="flex h-[80dvh] min-w-[280px] cursor-pointer items-center justify-center self-center rounded bg-[#E9EFFA] dark:bg-[#20212C] dark:brightness-110"
        onClick={addColumnHandle}
      >
        <p className="text-2xl text-[#828FA3]">+ New Column</p>
      </div>
    </div>
  );
};

export default ColumnsPage;
