import { useAppSelector } from "@/store/hooks";
import ColumnTask from "./ColumnList";

const ColumnsPage = () => {
  const data = useAppSelector((state) => state.dataSlice.data);
  const activeBoard = useAppSelector(
    (state) => state.activeBoardSlice.activeBoard,
  );
  const activePageColumns = data.find(
    (board) => board._id === activeBoard,
  ).columns;

  interface Task {
    description: string;
    subtasks: Array<any>;
    status: string;
    _id: string;
  }

  return (
    <div className="flex flex-grow gap-6  pl-6 pt-20 ">
      {activePageColumns.map((lists: any) => (
        <div key={lists._id} className="flex min-w-[280px] flex-col gap-5 pt-6">
          <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-[#828FA3]">
            {`${lists.nameColumn} (${lists.tasks.length})`}
          </h3>
          {lists.tasks.map((task: Task) => (
            <ColumnTask
              key={task._id}
              description={task.description}
              status={task.status}
              subtasks={task.subtasks}
              id={task._id}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ColumnsPage;
