"use server";

import { ObjectId } from "mongodb";
import Board from "../models/board.model";
import { connectToDB } from "../mongoose";

export async function createBoard(name: string, ...columnName: any) {
  try {
    await connectToDB();

    const formattedColumns = columnName.map((name: any) => ({
      nameColumn: name,
    }));

    const columnsObject = { columns: formattedColumns };

    await Board.create({
      name,
      ...columnsObject,
    });
  } catch (error: any) {
    throw new Error("Error creating Board " + error);
  }
}

export async function addNewColumn(id: string, column: string) {
  try {
    await connectToDB();

    const findBoard = await Board.findById(id);

    findBoard.columns.push({ nameColumn: column });

    await findBoard.save();
  } catch (error: any) {
    throw new Error("Error creating Board " + error);
  }
}

interface Column {
  nameColumn: string;
  tasks: Array<any>;
  _id: string;
}

export async function getBoard() {
  try {
    await connectToDB();

    const boards = await Board.find();
    const simpleBoard = boards.map((data) => {
      return {
        _id: data._id.toString(),
        name: data.name,
        columns: data.columns.map((column: Column) => {
          // console.log(column);
          return {
            nameColumn: column.nameColumn || null,
            _id: column._id.toString(),
            tasks:
              column.tasks.map((task) => {
                console.log(task);
                return {
                  task: task.task,
                  description: task.description,
                  subtasks: task.subtasks.map((subtask: any) => ({
                    subtask: subtask.subtask,
                    status: subtask.status,
                    subId: subtask.subId,
                  })),
                  status: task.status,
                  _id: task._id,
                };
              }) || null,
          };
        }),
      };
    });

    return simpleBoard;
  } catch (error: any) {
    throw new Error("Error getting Board " + error);
  }
}

export async function deleteBoard(id: string) {
  try {
    await connectToDB();

    const board = await Board.findByIdAndDelete(id);
  } catch (error: any) {
    throw new Error("Error creating Board " + error);
  }
}

export async function editBoard(id: string, newBoardName: string) {
  try {
    await connectToDB();

    await Board.updateOne({ _id: id }, { name: newBoardName });
  } catch (error: any) {
    throw new Error("Error editing Board " + error);
  }
}

export async function newTask(
  id: string,
  columnId: string,
  titleTask: string,
  description: string,
  subtasks: Array<{ name: string; status: boolean; subId: number }>,
  status: string,
) {
  try {
    await connectToDB();

    const findBoard = await Board.findById(id);
    const newTask = findBoard.columns.find(
      (column: Column) => column._id.toString() === columnId,
    );

    const formattedSubtasks = subtasks.map((subtask) => ({
      subtask: subtask.name,
      status: subtask.status,
      subId: subtask.subId,
    }));

    newTask.tasks.push({
      task: titleTask,
      description,
      subtasks: formattedSubtasks,
      status,
    });

    console.log(newTask);

    await findBoard.save();
  } catch (error) {
    throw new Error("Error creating new task " + error);
  }
}
