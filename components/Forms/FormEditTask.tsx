import { ChangeEvent, useEffect, useState } from "react";
import removeIcon from "@/public/assets/icon-cross.svg";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import chevronDown from "@/public/assets/icon-chevron-down.svg";
import Button from "../ui/Button";

interface Subtasks {
  subtask: string;
  status: boolean;
  subId: number;
}

interface Task {
  task: string;
  description: string;
  status: string;
  _id: string;
  subtasks: Array<Subtasks>;
}

const FormEditTask = () => {
  // TODO add to board action
  const dispatch = useAppDispatch();
  const dataIds = useAppSelector((state) => state.activeBoardSlice.editTask);

  const activeBoard = useAppSelector(
    (state) => state.activeBoardSlice.activeBoard,
  );

  const allData = useAppSelector((state) => state.dataSlice.data);
  const dataTask: Task = allData
    .find((item) => item._id === activeBoard)
    .columns.find((column: any) => column._id === dataIds.colId)
    .tasks.find((task: any) => task._id === dataIds.taskId);

  const dataCols = allData.find((item) => item._id === activeBoard).columns;
  const statusArr: Array<{ name: string; id: string }> = [];
  for (const element of dataCols) {
    statusArr.push({ name: element.nameColumn, id: element._id });
  }

  const activeStatusData = statusArr.find((item) => item.id === dataIds.colId);

  const [title, setTitile] = useState<string>(dataTask.task);
  const [descriptionText, setDescritpionText] = useState<string>(
    dataTask.description,
  );

  const [subtasks, setSubtasks] = useState<Subtasks[]>([]);

  useEffect(() => {
    if (dataTask && dataTask.subtasks) {
      setSubtasks(
        dataTask.subtasks.map((subtask) => ({
          subtask: subtask.subtask,
          status: subtask.status,
          subId: subtask.subId,
        })),
      );
    }
  }, [dataTask.subtasks]);

  const [activeStatus, setActiveStatus] = useState(activeStatusData);
  const [statusClicked, setStatusClicked] = useState<boolean>(false);
  const [submitClicked, setSubmitClicked] = useState<boolean>(false);
  const [fillSubtaskError, setFillSubtaskError] = useState<string>("");
  const [fillTitleError, setFillTitleError] = useState<string>("");

  console.log(activeStatus);

  const newSubtaskHandle = () => {
    const newSubtask: Subtasks = {
      subtask: "",
      status: false,
      subId: Math.random(),
    };
    if (subtasks?.find((subtask) => subtask.subtask === "")) {
      setFillSubtaskError("Can't be empty.");
      return;
    } else {
      setFillSubtaskError("");
      setSubtasks([...subtasks, newSubtask]);
    }
  };

  const removeColumn = (index: number) => {
    if (subtasks?.length === 1) setFillSubtaskError("Can't be empty.");
    else setSubtasks(subtasks?.filter((subtask) => subtask.subId !== index));
  };

  useEffect(() => {
    if (submitClicked && !title) setFillTitleError("Can't be empty.");
  }, [submitClicked]);

  return (
    <form className="mb-6 flex flex-col gap-6">
      <div className="relative flex flex-col gap-2">
        <label className="input_text--label " htmlFor="title">
          title
        </label>
        <input
          id="title"
          type="text"
          className={`$ input_text h-10 w-full `}
          placeholder="e.g. Take coffee break"
          value={title}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setTitile(event.target.value);
          }}
        />

        {fillTitleError && !title ? (
          <p
            className={`${
              fillTitleError && !title
            } absolute right-1 top-[50%] translate-y-[-50%] text-xs text-red-600 sm:right-4`}
          >
            {fillTitleError}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label className="input_text--label ">description</label>
        <textarea
          className={`$ input_text h-28 max-h-52 min-h-[60px] w-full `}
          placeholder="e.g. It’s always good to take a break. This 15 minute break will 
          recharge the batteries a little."
          value={descriptionText}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            setDescritpionText(event.target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="input_text--label">Subtasks</label>
        <div className="flex max-h-[140px] flex-col gap-2 overflow-y-auto">
          {subtasks?.map((item) => {
            return (
              <div key={item.subId} className="flex items-center gap-4">
                <div className="relative w-full">
                  {fillSubtaskError && !item.subtask ? (
                    <p
                      className={`${
                        fillSubtaskError && !item.subtask
                      } absolute right-1 top-[50%] translate-y-[-50%] text-xs text-red-600 sm:right-4`}
                    >
                      {fillSubtaskError}
                    </p>
                  ) : null}
                  <input
                    type="text"
                    placeholder="e.g. Make coffee"
                    className={`${
                      fillSubtaskError && !item.subtask
                        ? "border-red-600"
                        : "border-[#828FA340]"
                    } input_text h-10 w-full`}
                    value={item.subtask}
                    onChange={(e) => {
                      const newName = e.target.value;
                      const updatedColumns = subtasks?.map((column) => {
                        if (column.subId === item.subId) {
                          column.subtask = newName;
                        }
                        return column;
                      });
                      setSubtasks(updatedColumns);
                    }}
                  />
                </div>
                <div
                  onClick={() => removeColumn(item.subId)}
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
          <p>{activeStatus?.name}</p>
          <Image
            alt="chevron down"
            height={12}
            width={12}
            src={chevronDown}
            className="absolute right-4 top-[50%] translate-y-[-50%]"
          />
        </div>
        {statusClicked && (
          <ul className="  flex  h-fit w-full flex-col  rounded-lg bg-[#20212C]   py-6 outline-none placeholder:text-[#000112]/25 ">
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
      <Button disabled={false} onClick={() => {}} plus={false} text="Edit" />
    </form>
  );
};

export default FormEditTask;
