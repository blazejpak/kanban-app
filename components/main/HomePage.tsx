import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Button from "../ui/Button";

const HomePage = () => {
  const data = useAppSelector((state) => state.dataSlice.data);

  const dispatch = useAppDispatch();

  let infoParagraph =
    "You don't have any boards yet. Create a new one to get started.";
  let textButton = `Create a Board`;

  if (data.length > 0) {
    infoParagraph = "This board is empty. Create a new column to get started.";
    textButton = `+ Add New Column`;
  }
  return (
    <>
      <h2 className="text-lg font-bold text-[#828FA3] ">{infoParagraph}</h2>
      <Button
        onClick={() => {
          dispatch({ type: "activeMenu/toggleForm" });
          if (data.length === 0)
            dispatch({ type: "activeMenu/typeForm", payload: "board" });
          else dispatch({ type: "activeMenu/typeForm", payload: "column" });
        }}
        text={textButton}
        plus={false}
        disabled={false}
      />
    </>
  );
};

export default HomePage;
