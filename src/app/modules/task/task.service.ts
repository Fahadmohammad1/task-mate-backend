import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import User from "../user/user.model";
import { ITask } from "./task.interface";
import Task from "./task.model";
import { JwtPayload } from "jsonwebtoken";

const addTask = async (email: string, taskData: ITask) => {
  const findUser = await User.findOne({ email });

  if (!findUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");
  }

  taskData.user = email;

  return await Task.create(taskData);
};

// get all tasks
const getAllTasks = async (): Promise<ITask[] | null> => {
  return await Task.find();
};

// tasks added by a particular user
const getMyTasks = async (email: string): Promise<ITask[] | null> => {
  return await Task.find({ ownerEmail: email });
};

// get single task
const getSingleTask = async (id: string): Promise<ITask | null> => {
  return await Task.findOne({ id });
};

// update task
const updateTask = async (
  user: JwtPayload,
  id: string,
  updateData: Partial<ITask>
) => {
  const findTask = await Task.findOne({ id });

  if (user.role !== "admin" && findTask?.user !== user.email) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden Access");
  }

  return await Task.findByIdAndUpdate({ _id: id }, updateData);
};

// delete task
const deleteTask = async (
  user: JwtPayload,
  id: string
): Promise<ITask | null> => {
  const findTask = await Task.findOne({ _id: id });

  if (findTask?.user !== user.email) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Forbidden Access, you cannot delete"
    );
  }

  return await Task.findOneAndDelete({ _id: id });
};

export const TaskService = {
  addTask,
  getAllTasks,
  getSingleTask,
  getMyTasks,
  updateTask,
  deleteTask,
};
