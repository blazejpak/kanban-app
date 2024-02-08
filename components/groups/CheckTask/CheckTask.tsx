import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import Image from "next/image";
import dots from "@/public/assets/icon-vertical-ellipsis.svg";
import chevronDown from "@/public/assets/icon-chevron-down.svg";
import check from "@/public/assets/icon-check.svg";
import { getBoard, updateTask } from "@/lib/actions/board.action";
import Button from "@/components/ui/Button";

interface Props {
  activeMenu: boolean;
  task: string;
  description: string;
  status: string;
  subtasks: Array<any>;
  id: string;
}

const CheckTask = ({
  activeMenu,
  task,
  description,
  status,
  subtasks,
  id,
}: Props) => {
  const dispatch = useAppDispatch();
  console.log(id);

  const isCheckTaskActive = useAppSelector(
    (state) => state.activeMenuSlice.checkTask,
  );
  const activeBoard = useAppSelector(
    (state) => state.activeBoardSlice.activeBoard,
  );
  const allData = useAppSelector((state) => state.dataSlice.data);
  const data = allData.find((item) => item._id === activeBoard).columns;
  const activeCol = data.find((item: any) => {
    return item.tasks.find((task: any) => {
      return task._id === id;
    });
  });
  console.log(activeCol._id);

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
        }
      }
      return;
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [isCheckTaskActive]);

  const saveTaskUpdate = async () => {
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
    console.log(subtaskStatus);
    const boards: any = await getBoard();
    dispatch({ type: "dataDB/getData", payload: boards });
    dispatch({ type: "activeMenu/toggleCheckTask" });
  };

  return (
    <div
      ref={backdropRef}
      className={`${
        activeMenu && " sm:translate-x-[-75%]"
      } pointer-events-auto   absolute  left-[50%] top-[50%]   z-50  max-h-[80%] w-[340px] translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-md bg-white p-8 text-start opacity-100 dark:bg-[#2B2C37] sm:w-[480px]`}
    >
      <div className="flex h-full w-full flex-col gap-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className=" text-lg font-bold">{task}</h3>
          <Image className="h-5 w-2" src={dots} alt="Edit tasks image." />
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
                    className="flex cursor-pointer items-center gap-4 bg-[#1F202B] px-2 py-4"
                    onClick={() => handleChangeStatus(subtask.subId)}
                  >
                    <div
                      className={`relative h-4 min-w-[16px] border-[1px] border-[#828FA3]/50  ${
                        subtask.status ? "bg-[#635FC7]" : "bg-[#2B2C37]"
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
            <ul className="top-[110%] z-[100] flex  h-fit w-full flex-col text-ellipsis rounded-lg bg-[#20212C]   py-6 outline-none placeholder:text-[#000112]/25 ">
              {statusArr.map((item) => {
                return (
                  <li
                    key={item.id}
                    value={item.name}
                    className="cursor-pointer px-4 py-1 text-[#828FA3] first-letter:uppercase hover:brightness-200 "
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
