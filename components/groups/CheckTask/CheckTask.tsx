import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import Image from "next/image";
import dots from "@/public/assets/icon-vertical-ellipsis.svg";
import chevronDown from "@/public/assets/icon-chevron-down.svg";
import check from "@/public/assets/icon-check.svg";
import { getBoard, updateTask } from "@/lib/actions/board.action";
import Button from "@/components/ui/Button";
import DeleteTask from "./DeleteTask";
import { LineWave } from "react-loader-spinner";

interface Props {
  activeMenu: boolean;
  task: string;
  description: string;
  status: string;
  subtasks: Array<any>;
  id: string;
}

const CheckTask = ({ activeMenu, task, description, subtasks, id }: Props) => {
  const dispatch = useAppDispatch();

  const [spinner, setSpinner] = useState<boolean>(false);
  const [submitClicked, setSubmitClicked] = useState<boolean>(false);

  // Option Delete Task, Edit Task
  const [optionsActive, setOptionsActive] = useState<boolean>(false);
  const deleteTask = useAppSelector(
    (state) => state.activeMenuSlice.deleteTask,
  );

  const isCheckTaskActive = useAppSelector(
    (state) => state.activeMenuSlice.checkTask,
  );
  const activeBoard = useAppSelector(
    (state) => state.activeBoardSlice.activeBoard,
  );
  const allData = useAppSelector((state) => state.dataSlice.data);
  const data = allData.find((item: any) => item._id === activeBoard).columns;
  const activeCol = data.find((item: any) => {
    return item.tasks.find((task: any) => {
      return task._id === id;
    });
  });

  const statusArr: Array<{ name: string; id: string }> = [];
  for (const element of data) {
    statusArr.push({ name: element.nameColumn, id: element._id });
  }
  const [statusClicked, setStatusClicked] = useState<boolean>(false);
  const [activeStatus, setActiveStatus] = useState<any>({
    name: activeCol.nameColumn,
    id: activeCol._id,
  });

  // Subtasks
  const [subtaskStatus, setSubtaskStatus] = useState(subtasks);

  const handleChangeStatus = (id: number) => {
    setSubtaskStatus((prevState: any) => {
      return prevState.map((state: any) => {
        return state.subId === id ? { ...state, status: !state.status } : state;
      });
    });
  };
  //

  const backdropRef = useRef<HTMLElement | any>();
  useEffect(() => {
    const handler = async (event: MouseEvent) => {
      if (isCheckTaskActive) {
        if (!backdropRef.current) return;
        else if (
          !backdropRef.current.contains(event.target) &&
          isCheckTaskActive
        ) {
          event.stopPropagation();
          dispatch({ type: "activeMenu/toggleCheckTask" });
          dispatch({
            type: "activeMenu/toggleDeleteTask",
            payload: false,
          });
        }
      }
      return;
    };

    document.addEventListener("mousedown", handler, true);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isCheckTaskActive]);

  const saveTaskUpdate = async (e: any) => {
    e.preventDefault();
    try {
      if (!submitClicked) {
        setSubmitClicked(true);
        setSpinner(true);
        await updateTask(
          activeBoard,
          activeStatus.id,
          activeCol._id,
          id,
          task,
          description,
          subtaskStatus,
          activeStatus.name,
        );
        const boards: any = await getBoard();
        dispatch({ type: "dataDB/getData", payload: boards });
        dispatch({ type: "activeMenu/toggleCheckTask" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSpinner(false);
      setSubmitClicked(false);
    }
  };

  return (
    <div
      ref={backdropRef}
      className={`${
        activeMenu && " sm:translate-x-[-50%]"
      }   absolute  left-[50%] top-[50%]   z-50  max-h-[80%] w-[340px] translate-x-[-50%] translate-y-[-50%] overflow-y-auto overflow-x-hidden rounded-md bg-white p-8 text-start opacity-100 dark:bg-[#2B2C37] sm:w-[480px] ${
        deleteTask ? "pointer-events-none " : "pointer-events-auto "
      }`}
    >
      <div className="flex h-full w-full flex-col gap-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className=" text-lg font-bold">{task}</h3>
          <div
            className="relative"
            onClick={() => {
              setOptionsActive((prevState) => !prevState);
            }}
          >
            <Image
              className="h-5 w-2 cursor-pointer"
              src={dots}
              alt="Edit tasks image."
            />
            {/* DELETE AND EDIT MENU */}
            {optionsActive && (
              <nav className="absolute right-4 top-[110%] z-50 h-24 w-48 rounded-lg bg-[#fff] p-4 text-[#828FA3] shadow-md dark:bg-[#1F202B]">
                <ul className="flex h-full w-full flex-col justify-center gap-3 text-sm font-medium">
                  <li
                    className="cursor-pointer"
                    onClick={() => {
                      dispatch({ type: "activeMenu/toggleEditTask" });
                      dispatch({
                        type: "activeBoard/payloadEditTask",
                        payload: {
                          boardId: activeBoard,
                          taskId: id,
                          colId: activeStatus.id,
                        },
                      });
                      setOptionsActive(false);
                      dispatch({ type: "activeMenu/toggleCheckTask" });
                    }}
                  >
                    Edit Task
                  </li>
                  <li
                    className="cursor-pointer text-red-500"
                    onClick={() => {
                      dispatch({
                        type: "activeMenu/toggleDeleteTask",
                        payload: true,
                      });
                      setOptionsActive(false);
                    }}
                  >
                    Delete Task
                  </li>
                </ul>
              </nav>
            )}
          </div>
          {deleteTask && (
            <DeleteTask task={task} taskId={id} colId={activeStatus.id} />
          )}
        </div>
        <p className="text-xs font-medium leading-6 tracking-widest text-[#828FA3]">
          {description}
        </p>
        <div className="flex flex-col gap-3">
          <h3 className=" text-sm font-bold">Subtasks</h3>
          <ul className="flex flex-col gap-2 ">
            {subtaskStatus &&
              subtaskStatus.map((subtask: any) => {
                return (
                  <li
                    key={subtask.subId}
                    className="flex cursor-pointer items-center gap-4 rounded-md bg-[#F4F7FD] px-2 py-4 hover:bg-[#635FC7]/25 dark:bg-[#1F202B] dark:hover:bg-[#635FC7]/25"
                    onClick={() => handleChangeStatus(subtask.subId)}
                  >
                    <div
                      className={`relative h-4 min-w-[16px] border-[1px] border-[#828FA3]/50  ${
                        subtask.status
                          ? "bg-[#635FC7]"
                          : "bg-white dark:bg-[#2B2C37]"
                      }`}
                    >
                      {subtask.status && (
                        <Image
                          src={check}
                          alt="Check icon"
                          className="absolute left-[50%] top-[50%] h-2 w-2 translate-x-[-50%] translate-y-[-50%]"
                        />
                      )}
                    </div>
                    <p
                      className={`text-xs font-bold ${
                        subtask.status && "line-through opacity-50	"
                      }`}
                    >
                      {subtask.subtask}
                    </p>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className=" text-sm font-bold">Current Status</h3>
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
            <ul className="top-[110%] z-[100] flex  h-fit w-full flex-col text-ellipsis rounded-lg bg-[#F4F7FD]    py-6 outline-none placeholder:text-[#000112]/25  dark:bg-[#20212C] ">
              {statusArr.map((item) => {
                return (
                  <li
                    key={item.id}
                    value={item.name}
                    className="cursor-pointer px-4 py-1 text-[#828FA3] first-letter:uppercase hover:brightness-50 dark:hover:brightness-200"
                    onClick={() => {
                      setActiveStatus({ name: item.name, id: item.id });
                      setStatusClicked((prevStatus) => !prevStatus);
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
          onClick={saveTaskUpdate}
          plus={false}
          text="Save"
        />
      </div>
    </div>
  );
};

export default CheckTask;
