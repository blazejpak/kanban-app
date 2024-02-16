import { ChangeEvent, useEffect, useState } from "react";
import removeIcon from "@/public/assets/icon-cross.svg";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import chevronDown from "@/public/assets/icon-chevron-down.svg";
import Button from "../ui/Button";
import { getBoard, newTask } from "@/lib/actions/board.action";
import { LineWave } from "react-loader-spinner";

const FormNewTask = () => {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(
    (state) => state.activeBoardSlice.activeBoard,
  );
  const [spinner, setSpinner] = useState<boolean>(false);

  const allData = useAppSelector((state) => state.dataSlice.data);
  const data = allData.find((item) => item._id === activeBoard).columns;

  const statusArr: Array<{ name: string; id: string }> = [];
  for (const element of data) {
    statusArr.push({ name: element.nameColumn, id: element._id });
  }
  const [title, setTitile] = useState<string>("");
  const [descriptionText, setDescritpionText] = useState<string>("");
  const [subtasks, setSubtasks] = useState<
    Array<{ name: string; status: boolean; subId: number }>
  >([{ name: "", status: false, subId: Math.random() }]);

  const [activeStatus, setActiveStatus] = useState(statusArr[0]);
  const [statusClicked, setStatusClicked] = useState<boolean>(false);
  const [submitClicked, setSubmitClicked] = useState<boolean>(false);
  const [fillSubtaskError, setFillSubtaskError] = useState<string>("");
  const [fillTitleError, setFillTitleError] = useState<string>("");

  const newSubtaskHandle = () => {
    const newSubtask = { name: "", status: false, subId: Math.random() };
    if (subtasks.find((subtask) => subtask.name === "")) {
      setFillSubtaskError("Can't be empty.");
      return;
    } else {
      setFillSubtaskError("");
      setSubtasks([...subtasks, newSubtask]);
    }
  };

  const removeColumn = (index: number) => {
    if (subtasks.length === 1) setFillSubtaskError("Can't be empty.");
    else setSubtasks(subtasks.filter((subtask) => subtask.subId !== index));
  };

  const submitTaskHandle = async (e: any) => {
    e.preventDefault();
    setSpinner(true);
    setSubmitClicked(true);
    if (subtasks.find((subtask) => subtask.name === "") || !title) {
      setSpinner(false);
      return;
    } else {
      await newTask(
        activeBoard,
        activeStatus.id,
        title,
        descriptionText,
        subtasks,
        activeStatus.name,
      );
      setSubmitClicked(false);
      setFillSubtaskError("");
      setFillTitleError("");

      const boards: any = await getBoard();
      dispatch({ type: "dataDB/getData", payload: boards });
      dispatch({ type: "activeMenu/toggleNewTask" });
      setSpinner(false);
    }
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
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            setDescritpionText(event.target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="input_text--label">Subtasks</label>
        <div className="flex max-h-[140px] flex-col gap-2 overflow-y-auto">
          {subtasks.map((item) => {
            return (
              <div key={item.subId} className="flex items-center gap-4">
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
                        if (column.subId === item.subId) {
                          column.name = newName;
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
          <ul className="  flex  h-fit w-full flex-col  rounded-lg bg-[#F4F7FD] py-6  outline-none placeholder:text-[#000112]/25 dark:bg-[#20212C] ">
            {statusArr.map((item) => {
              return (
                <li
                  key={item.id}
                  value={item.name}
                  className="cursor-pointer px-4 py-1 text-[#828FA3] first-letter:uppercase hover:brightness-50 dark:hover:brightness-200"
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
      {spinner && (
        <div className="self-center">
          <LineWave
            visible={true}
            height="100"
            width="100"
            color="#635FC7"
            ariaLabel="line-wave-loading"
          />
        </div>
      )}
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
