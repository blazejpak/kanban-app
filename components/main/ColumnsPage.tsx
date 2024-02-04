import { useAppSelector } from "@/store/hooks";
import ColumnTask from "./ColumnTask";

const ColumnsPage = () => {
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
  return (
    <div className="flex flex-grow gap-6  pl-6 pt-20 ">
      {activePageColumns.map((column: Column) => {
        return (
          <ul
            key={column._id}
            className="flex min-w-[280px] max-w-[300px] flex-col gap-5 pt-6"
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
    </div>
  );
};

export default ColumnsPage;
