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
          return {
            nameColumn: column.nameColumn || null,
            _id: column._id.toString(),
            tasks:
              column.tasks.map((task) => {
                return {
                  task: task.task,
                  description: task.description,
                  subtasks: task.subtasks.map((subtask: any) => ({
                    subtask: subtask.subtask,
                    status: subtask.status,
                    subId: subtask.subId,
                  })),
                  status: task.status,
                  _id: task._id.toString(),
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
  subtasks: any,
  status: string,
) {
  try {
    await connectToDB();

    const findBoard = await Board.findById(id);
    const newTask = findBoard.columns.find(
      (column: Column) => column._id.toString() === columnId,
    );

    const formattedSubtasks = subtasks.map((subtask: any) => ({
      subtask: subtask.subtask,
      status: subtask.status,
      subId: subtask.subId,
    }));

    newTask.tasks.push({
      task: titleTask,
      description,
      subtasks: formattedSubtasks,
      status,
    });

    await findBoard.save();
  } catch (error) {
    throw new Error("Error creating new task " + error);
  }
}

export async function updateTask(
  boardId: string,
  colId: string,
  oldColId: string,
  taskId: string,
  titleTask: string,
  description: string,
  subtasks: Array<{ subtask: string; status: boolean; subId: number }>,
  status: string,
) {
  try {
    const findBoard = await Board.findById(boardId);
    const newTask = findBoard.columns.find(
      (column: Column) => column._id.toString() === colId,
    );
    const oldColTask = findBoard.columns.find(
      (column: Column) => column._id.toString() === oldColId,
    );

    const formattedSubtasks = subtasks.map((subtask) => ({
      subtask: subtask.subtask,
      status: subtask.status,
      subId: subtask.subId,
    }));

    const usedTask = newTask.tasks.find(
      (item: any) => item._id.toString() === taskId,
    );
    console.log(newTask);
    console.log(oldColTask);
    if (usedTask) {
      usedTask.subtasks = formattedSubtasks;
    } else {
      newTask.tasks.push({
        task: titleTask,
        description,
        subtasks: formattedSubtasks,
        status,
      });
      oldColTask.tasks = oldColTask.tasks.filter(
        (item: any) => item._id.toString() !== taskId,
      );
    }

    await findBoard.save();
  } catch (error) {
    throw new Error("Error updating task " + error);
  }
}
