import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  columns: [
    {
      nameColumn: { type: String, required: true },

      tasks: [
        {
          task: { type: String, required: true },
          description: { type: String },
          subtasks: [
            {
              subtask: { type: String },
              status: { type: Boolean },
            },
          ],
          status: { type: String, required: true },
        },
      ],
    },
  ],
});

const Board = mongoose.models.Board || mongoose.model("Board", boardSchema);

export default Board;
