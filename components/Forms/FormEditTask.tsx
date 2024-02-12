import { ChangeEvent, EventHandler, useEffect, useState } from "react";
import removeIcon from "@/public/assets/icon-cross.svg";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import chevronDown from "@/public/assets/icon-chevron-down.svg";
import Button from "../ui/Button";
import { editTask, getBoard } from "@/lib/actions/board.action";

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

  console.log(dataIds.taskId);

  const dataCols = allData.find((item) => item._id === activeBoard).columns;
  const statusArr: Array<any> = [];

  for (const element of dataCols) {
    statusArr.push({ name: element.nameColumn, id: element._id });
  }

  const activeStatusData: { name: string; id: string } = statusArr.find(
    (item) => item.id === dataIds.colId,
  );

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

  const [submitClicked, setSubmitClicked] = useState<boolean>(false);
  const [fillSubtaskError, setFillSubtaskError] = useState<string>("");
  const [fillTitleError, setFillTitleError] = useState<string>("");

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

  const submitEditForm = async (e: any) => {
    e.preventDefault();

    setSubmitClicked(true);
    if (subtasks.find((subtask) => subtask.subtask === "") || !title) {
      return;
    } else {
      await editTask(
        activeBoard,
        activeStatusData?.id,
        dataIds.taskId,
        title,
        descriptionText,
        subtasks,
      );
      console.log(subtasks);
      setSubmitClicked(false);
      setFillSubtaskError("");
      setFillTitleError("");

      const boards: any = await getBoard();
      dispatch({ type: "dataDB/getData", payload: boards });
      dispatch({ type: "activeMenu/toggleEditTask" });
    }
  };

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

      <Button
        disabled={false}
        onClick={submitEditForm}
        plus={false}
        text="Edit"
      />
      <button
        type="button"
        className="flex w-full items-center   justify-center rounded-3xl bg-[#635FC71A] px-4 py-2 font-bold text-[#635FC7] transition-all hover:bg-[#635FC740] dark:bg-white dark:hover:bg-white/75 "
        onClick={() => {
          dispatch({ type: "activeMenu/toggleEditTask" });
        }}
      >
        Close
      </button>
    </form>
  );
};

export default FormEditTask;
