import FormEditTask from "@/components/Forms/FormEditTask";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useRef } from "react";

const EditTask = () => {
  const dispatch = useAppDispatch();

  const editTaskBox = useAppSelector((state) => state.activeMenuSlice.editTask);

  // const backdropRef = useRef<HTMLElement | any>();
  // useEffect(() => {
  //   const handler = async (event: MouseEvent) => {
  //     if (editTaskBox) {
  //       if (!backdropRef.current) return;
  //       else if (!backdropRef.current.contains(event.target) && editTaskBox) {
  //         event.stopPropagation();
  //         dispatch({ type: "activeMenu/toggleEditTask" });
  //       }
  //     }
  //     return;
  //   };

  //   document.addEventListener("click", handler, true);

  //   return () => {
  //     document.removeEventListener("click", handler);
  //   };
  // }, [editTaskBox]);

  return (
    <div
      // ref={backdropRef}
      className={` pointer-events-auto absolute left-[50%] top-[50%] z-40 h-fit max-h-[80%] w-[340px] translate-x-[-50%]  translate-y-[-50%] overflow-y-auto rounded-md bg-white p-8 text-start opacity-100 dark:bg-[#2B2C37] sm:w-[480px]`}
    >
      <div className="flex h-full w-full flex-col">
        <h3 className="mb-6 text-lg font-bold">Edit Task</h3>
        <FormEditTask />
      </div>
    </div>
  );
};

export default EditTask;
