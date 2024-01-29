import { useAppSelector } from "@/store/hooks";
import ColumnList from "./ColumnList";

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
    tasks: Array<{ description: string; subtasks: Array<any>; status: string }>;
    _id: string;
  }
  console.log(activePageColumns);
  return (
    <div className="flex flex-grow gap-6  pl-6 pt-20 ">
      {activePageColumns.map((lists: any) => (
        <div
          key={lists._id}
          className="flex  min-w-[280px] flex-col gap-5 pt-6"
        >
          <h3 className="mb-1">{lists.nameColumn}</h3>
          <div className="h-20 w-full rounded-lg dark:bg-[#2B2C37]"></div>
        </div>
      ))}
    </div>
  );
};

export default ColumnsPage;
