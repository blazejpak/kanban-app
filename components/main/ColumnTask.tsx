interface Task {
  task: string;
  description: string;
  subtasks: Array<any>;
  status: string;
  id: string;
}

const ColumnTask = ({ task, description, status, subtasks, id }: Task) => {
  const numberOfSubtasksDone = subtasks.reduce((acc, subtask) => {
    if (subtask.status) acc++;
    return acc;
  }, 0);

  return (
    <div className="group flex h-fit w-full cursor-pointer flex-col gap-1 rounded-lg bg-white py-6 pl-4 font-bold first-letter:uppercase dark:bg-[#2B2C37]">
      <h2 className=" group-hover:text-[#635FC7]">{task}</h2>
      <p className="text-xs text-[#828FA3]">{`${numberOfSubtasksDone} of ${subtasks.length} subtasks`}</p>
    </div>
  );
};

export default ColumnTask;
