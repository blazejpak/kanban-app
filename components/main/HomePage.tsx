import { useAppSelector } from "@/store/hooks";
import ColumnsPage from "./ColumnsPage";
import ClearPage from "./ClearPage";

const HomePage = () => {
  const data = useAppSelector((state) => state.dataSlice.data);
  console.log(data);
  const activeBoard = useAppSelector(
    (state) => state.activeBoardSlice.activeBoard,
  );
  const activePage = data.find((board) => board._id === activeBoard);

  return (
    <>{activePage?.columns.length > 0 ? <ColumnsPage /> : <ClearPage />}</>
  );
};

export default HomePage;
