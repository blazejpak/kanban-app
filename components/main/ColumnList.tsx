interface Column {
  nameColumn: string;
  tasks: Array<{ description: string; subtasks: Array<any>; status: string }>;
  _id: string;
}

const ColumnList = () => {
  return <div>Column</div>;
};

export default ColumnList;
