import { useState } from "react";
import removeIcon from "@/public/assets/icon-cross.svg";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";

import chevronDown from "@/public/assets/icon-chevron-down.svg";
import Button from "../ui/Button";

const FormNewTask = () => {
  const activeBoard = useAppSelector(
    (state) => state.activeBoardSlice.activeBoard,
  );

  const allData = useAppSelector((state) => state.dataSlice.data);
  const data = allData.find((item) => item._id === activeBoard).columns;

  const statusArr: Array<{ name: string; id: string }> = [];
  for (const element of data) {
    statusArr.push({ name: element.nameColumn, id: element._id });
  }
  const [activeStatus, setActiveStatus] = useState(statusArr[0]);
  const [subtasks, setSubtasks] = useState<
    Array<{ name: string; status: boolean; id: number }>
  >([{ name: "", status: false, id: Math.random() }]);

  const [statusClicked, setStatusClicked] = useState<boolean>(false);
  const [fillSubtaskError, setFillSubtaskError] = useState<string>("");

  const newSubtaskHandle = () => {
    const newSubtask = { name: "", status: false, id: Math.random() };
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

  const submitTaskHandle = () => {};

  return (
    <form className="mb-6 flex flex-col gap-6">
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
      <div className="relative  flex flex-col gap-2">
        <label className="input_text--label">status</label>
        <div
          className="input_text relative flex h-10 items-center"
          onClick={() => setStatusClicked((prevStatus) => !prevStatus)}
        >
          <p>{activeStatus.name}</p>
          <Image
            alt="chevron down"
            height={12}
            width={12}
            src={chevronDown}
            className="absolute right-4 top-[50%] translate-y-[-50%]"
          />
        </div>
        {statusClicked && (
          <ul className="top-[110%] z-[100] flex  h-fit w-full flex-col text-ellipsis rounded-lg bg-[#20212C]   py-6 outline-none placeholder:text-[#000112]/25 ">
            {statusArr.map((item) => {
              return (
                <li
                  key={item.id}
                  value={item.name}
                  className="cursor-pointer px-4 py-1 text-[#828FA3] first-letter:uppercase hover:brightness-200 "
                  onClick={() => {
                    setActiveStatus(item);
                  }}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <Button
        disabled={false}
        onClick={submitTaskHandle}
        plus={false}
        text="Create Task"
      />
    </form>
  );
};

export default FormNewTask;
