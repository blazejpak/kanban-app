interface Task {
  task: string;
  description: string;
  subtasks: Array<any>;
  status: string;
  id: string;
}

const ColumnTask = ({ task, description, status, subtasks, id }: Task) => {
  return (
    <div className="h-20 w-full rounded-lg bg-white pl-4 pt-6 font-bold first-letter:uppercase dark:bg-[#2B2C37]">
      Column
    </div>
  );
};

export default ColumnTask;
