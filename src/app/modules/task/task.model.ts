import mongoose, { Schema } from "mongoose";
import { ITask, Priorities } from "./task.interface";

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: Priorities,
      required: true,
    },
    description: {
      type: String,
      default: "No Description added",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
