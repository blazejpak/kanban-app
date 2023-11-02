"use server";

import Board from "../models/board.model";
import { connectToDB } from "../mongoose";

export async function createBoard(name: string) {
  try {
    await connectToDB();

    await Board.create({
      name,
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
