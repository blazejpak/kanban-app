import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import FormNewTask from "../Forms/FormNewTask";

interface Props {
  activeMenu: boolean;
}

const AddNewTask = ({ activeMenu }: Props) => {
  const backdropRef = useRef<HTMLElement | any>();
  const dispatch = useAppDispatch();

  const isNewTaskActive = useAppSelector(
    (state) => state.activeMenuSlice.newTask,
  );

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (isNewTaskActive) {
        if (!backdropRef.current) return;
        else if (
          !backdropRef.current.contains(event.target) &&
          isNewTaskActive
        ) {
          dispatch({ type: "activeMenu/toggleNewTask" });
          event.stopPropagation();
        }
      }
      return;
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [isNewTaskActive]);

  return (
    <div
      ref={backdropRef}
      className={`${
        activeMenu && "sm:translate-x-[-100px] md:translate-x-[0]"
      } pointer-events-auto absolute z-40   max-h-[80%] w-[340px] overflow-y-auto rounded-md bg-white  p-8  text-start opacity-100 dark:bg-[#2B2C37] sm:w-[480px]`}
    >
      {/* For new Board */}
      <div className="flex h-full w-full flex-col">
        <h3 className="mb-6 text-lg font-bold">Add New Task</h3>
        <FormNewTask />
      </div>
    </div>
  );
};

export default AddNewTask;
