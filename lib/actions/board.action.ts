"use server";

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
}

export async function getBoard() {
  try {
    await connectToDB();

    const boards = await Board.find();
    const simpleBoard = boards.map((data) => {
      return {
        _id: data._id.toString(),
        name: data.name,
        columns: data.columns.map((column: Column) => ({
          nameColumn: column.nameColumn || null,
          tasks: column.tasks.map((task) => {}),
        })),
      };
    });

    return simpleBoard;
  } catch (error: any) {
    throw new Error("Error creating Board " + error);
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
    throw new Error("Error creating Board " + error);
  }
}
