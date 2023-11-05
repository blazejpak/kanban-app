"use server";

import Board from "../models/board.model";
import { connectToDB } from "../mongoose";

export async function createBoard(name: string, ...columnName: any) {
  try {
    await connectToDB();

    console.log(columnName);

    const formattedColumns = columnName.map((name: any) => ({
      nameColumn: name,
    }));
    // Tworzenie pojedynczego obiektu z właściwymi kolumnami
    const columnsObject = { columns: formattedColumns };

    // TODO
    await Board.create({
      name,
      ...columnsObject,
    });
  } catch (error: any) {
    throw new Error("Error creating Board " + error);
  }
}

export async function getBoard() {
  try {
    await connectToDB();

    const boards = await Board.find();
    const simpleBoard = boards.map((data) => ({
      _id: data._id.toString(),
      name: data.name,
      columns: data.columns,
    }));

    return simpleBoard;
  } catch (error: any) {
    throw new Error("Error creating Board " + error);
  }
}
