import { useState } from "react";
import removeIcon from "@/public/assets/icon-cross.svg";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";

const FormNewTask = () => {
  const activeBoard = useAppSelector(
    (state) => state.activeBoardSlice.activeBoard,
  );
  //   TODO status
  const allData = useAppSelector((state) => state.dataSlice.data);
  const data = allData.find((item) => item._id === activeBoard).columns;

  const [fillSubtaskError, setFillSubtaskError] = useState<string>("");

  const [subtasks, setSubtasks] = useState<Array<any>>([
    { name: "", id: Math.random() },
  ]);

  const newSubtaskHandle = () => {
    const newSubtask = { name: "", id: Math.random() };
    if (subtasks.find((subtask) => subtask.name === "")) {
      setFillSubtaskError("Can't be empty.");
      return;
    } else {
      setFillSubtaskError("");
      setSubtasks([...subtasks, newSubtask]);
    }
  };

  const removeColumn = (index: number) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== index));
  };

  return (
    <form className="flex  flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="input_text--label " htmlFor="title">
          title
        </label>
        <input
          id="title"
          type="text"
          className={`$ input_text h-10 w-full `}
          placeholder="e.g. Take coffee break"
          value=""
          onChange={() => {}}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="input_text--label ">description</label>
        <textarea
          className={`$ input_text h-28 max-h-52 min-h-[60px] w-full `}
          placeholder="e.g. It’s always good to take a break. This 15 minute break will 
          recharge the batteries a little."
          onChange={() => {}}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="input_text--label">Subtasks</label>
        <div className="flex max-h-[140px] flex-col gap-2 overflow-y-auto">
          {subtasks.map((item) => {
            return (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative w-full">
                  {fillSubtaskError && !item.name ? (
                    <p
                      className={`${
                        fillSubtaskError && !item.name
                      } absolute right-1 top-[50%] translate-y-[-50%] text-xs text-red-600 sm:right-4`}
                    >
                      {fillSubtaskError}
                    </p>
                  ) : null}
                  <input
                    type="text"
                    placeholder="e.g. Make coffee"
                    className={`${
                      fillSubtaskError && !item.name
                        ? "border-red-600"
                        : "border-[#828FA340]"
                    } input_text h-10 w-full`}
                    value={item.name}
                    onChange={(e) => {
                      const newName = e.target.value;
                      const updatedColumns = subtasks.map((column) => {
                        if (column.id === item.id) {
                          column.name = newName;
                        }
                        return column;
                      });
                      setSubtasks(updatedColumns);
                    }}
                  />
                </div>
                <div
                  onClick={() => removeColumn(item.id)}
                  className="mr-2 cursor-pointer"
                >
                  <Image src={removeIcon} height={16} alt="Remove Icon" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button
          type="button"
          className="flex w-full items-center   justify-center rounded-3xl bg-[#635FC71A] px-4 py-2 font-bold text-[#635FC7] transition-all hover:bg-[#635FC740] dark:bg-white dark:hover:bg-white/75 "
          onClick={newSubtaskHandle}
        >
          + Add New Subtask
        </button>
      </div>

      {/* TODO */}
      <div className="flex flex-col gap-2">
        <label className="input_text--label">status</label>
        <div className="input_text relative flex h-10 items-center">
          <p>Doing</p>
        </div>
      </div>
    </form>
  );
};

export default FormNewTask;
