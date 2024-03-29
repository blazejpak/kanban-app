import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import FormEditBoard from "../Forms/FormEditBoard";

interface Props {
  activeMenu: boolean;
}

const EditBoard = ({ activeMenu }: Props) => {
  const backdropRef = useRef<HTMLElement | any>();
  const isEditBoardActive = useAppSelector(
    (state) => state.activeMenuSlice.editBoard,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (isEditBoardActive) {
        if (!backdropRef.current) return;
        else if (
          !backdropRef.current.contains(event.target) &&
          isEditBoardActive
        ) {
          dispatch({ type: "activeMenu/toggleEditBoard" });
          event.stopPropagation();
        }
      }
      return;
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [isEditBoardActive]);

  return (
    <div
      ref={backdropRef}
      className={` pointer-events-auto absolute left-[50%] top-[50%] z-40 h-fit max-h-[80%] w-[340px] translate-x-[-50%]  translate-y-[-50%] overflow-y-auto rounded-md bg-white p-8 text-start opacity-100 dark:bg-[#2B2C37] sm:w-[480px]`}
    >
      <div className="flex h-full w-full flex-col">
        <h3 className="mb-6 text-lg font-bold">Edit Name Board</h3>
        <FormEditBoard />
      </div>
    </div>
  );
};

export default EditBoard;
