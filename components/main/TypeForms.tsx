import { useAppDispatch, useAppSelector } from "@/store/hooks";
import AddBoard from "../groups/AddBoard";
import AddColumn from "../groups/AddColumn";
import { deleteBoard, editBoard } from "@/lib/actions/board.action";
import DeleteBoard from "../groups/DeleteBoard";
import EditBoard from "../groups/EditBoard";
import AddNewTask from "../groups/AddNewTask";
import { useEffect, useRef } from "react";

const TypeForms = () => {
  const backdropRef = useRef<HTMLElement | any>();

  const dispatch = useAppDispatch();

  const activeMenu = useAppSelector(
    (state) => state.activeMenuSlice.isActiveMenu,
  );
  const activeForm = useAppSelector(
    (state) => state.activeMenuSlice.isActiveForm,
  );
  const typeForm = useAppSelector((state) => state.activeMenuSlice.whatType);
  const deleteBoard = useAppSelector(
    (state) => state.activeMenuSlice.deleteBoard,
  );
  const editBoard = useAppSelector((state) => state.activeMenuSlice.editBoard);
  const newTaskForm = useAppSelector((state) => state.activeMenuSlice.newTask);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (activeForm) {
        if (!backdropRef.current) return;
        else if (!backdropRef.current.contains(event.target) && activeForm) {
          dispatch({ type: "activeMenu/toggleForm" });
          event.stopPropagation();
        }
      }
      return;
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [activeForm]);

  const element = document.querySelector<any>("html");
  if (activeForm || deleteBoard || editBoard || newTaskForm) {
    element.style.pointerEvents = "none";
  }
  if (!activeForm && !deleteBoard && !editBoard && !newTaskForm) {
    element.style.pointerEvents = "auto";
  }

  return (
    <>
      {activeForm && (
        <>
          <div
            className={`absolute z-30 h-full w-full backdrop-brightness-50`}
          ></div>
          {typeForm === "board" ? (
            <AddBoard activeMenu={activeMenu} backdropRef={backdropRef} />
          ) : (
            <AddColumn activeMenu={activeMenu} backdropRef={backdropRef} />
          )}
        </>
      )}

      {deleteBoard && (
        <>
          <div
            className={`absolute z-30 h-full w-full backdrop-brightness-50`}
          ></div>
          <DeleteBoard activeMenu={activeMenu} />
        </>
      )}

      {editBoard && (
        <>
          <div
            className={`absolute z-30 h-full w-full backdrop-brightness-50`}
          ></div>
          <EditBoard activeMenu={activeMenu} />
        </>
      )}

      {newTaskForm && (
        <>
          <div
            className={`absolute z-30 h-full w-full backdrop-brightness-50`}
          ></div>
          <AddNewTask activeMenu={activeMenu} />
        </>
      )}
    </>
  );
};

export default TypeForms;
