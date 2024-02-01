import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import FormNewTask from "../Forms/FormNewTask";

interface Props {
  activeMenu: boolean;
  task: string;
  description: string;
  status: string;
  subtasks: Array<any>;
}

const CheckTask = ({
  activeMenu,
  task,
  description,
  status,
  subtasks,
}: Props) => {
  const backdropRef = useRef<HTMLElement | any>();
  const dispatch = useAppDispatch();

  const isCheckTaskActive = useAppSelector(
    (state) => state.activeMenuSlice.checkTask,
  );

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (isCheckTaskActive) {
        if (!backdropRef.current) return;
        else if (
          !backdropRef.current.contains(event.target) &&
          isCheckTaskActive
        ) {
          dispatch({ type: "activeMenu/toggleCheckTask" });
          event.stopPropagation();
        }
      }
      return;
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [isCheckTaskActive]);

  return (
    <div
      ref={backdropRef}
      className={`${
        activeMenu && " sm:translate-x-[-75%]"
      } pointer-events-auto absolute  left-[50%]  top-[50%] z-40   max-h-[80%]  w-[340px] translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-md bg-white p-8 text-start opacity-100 dark:bg-[#2B2C37] sm:w-[480px]`}
    >
      <div className="flex h-full w-full flex-col">
        <h3 className="mb-6 text-lg font-bold">Add New Task</h3>
        <FormNewTask />
      </div>
    </div>
  );
};

export default CheckTask;
