import { useAppSelector } from "@/store/hooks";

const ColumnsPage = () => {
  const data = useAppSelector((state) => state.dataSlice.data);
  console.log(data);
  const activeBoard = useAppSelector(
    (state) => state.activeBoardSlice.activeBoard,
  );
  const activePage = data.find((board) => board._id === activeBoard);

  return <div className="pt-20">ColumnsPage</div>;
};

export default ColumnsPage;
