import FormEditTask from "@/components/Forms/FormEditTask";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const EditTask = () => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={` pointer-events-auto absolute left-[50%] top-[50%] z-[100] h-fit max-h-[80%] w-[340px] translate-x-[-50%]  translate-y-[-50%] overflow-y-auto rounded-md bg-white p-8 text-start  dark:bg-[#2B2C37] sm:w-[480px]`}
    >
      <div className="flex h-full w-full flex-col">
        <h3 className="mb-6 text-lg font-bold">Edit Task</h3>
        <FormEditTask />
      </div>
    </div>
  );
};

export default EditTask;
