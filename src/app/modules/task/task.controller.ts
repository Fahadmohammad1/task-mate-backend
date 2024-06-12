import { Request, Response } from "express";
import catchAsync from "../../../shared/createAsync";
import sendResponse from "../../../shared/sendResponse";
import { ITask } from "./task.interface";
import { TaskService } from "./task.service";
import { JwtPayload } from "jsonwebtoken";

const addTask = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user as JwtPayload;
  const taskData = req.body;
  const result = await TaskService.addTask(email, taskData);

  sendResponse<ITask | null>(res, {
    statusCode: 200,
    success: true,
    message: "Task added successfully!",
    data: result,
  });
});

// get all tasks
const getAllTasks = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskService.getAllTasks();

  sendResponse<ITask[] | null>(res, {
    statusCode: 200,
    success: true,
    message: "Tasks fetched successfully!",
    data: result,
  });
});

// get the tasks of a particular user
const getMyTasks = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user as JwtPayload;
  const result = await TaskService.getMyTasks(email);

  sendResponse<ITask[] | null>(res, {
    statusCode: 200,
    success: true,
    message: "Tasks fetched successfully!",
    data: result,
  });
});

// get single task
const getSingleTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TaskService.getSingleTask(id);

  sendResponse<ITask | null>(res, {
    statusCode: 200,
    success: true,
    message: "Task fetched successfully!",
    data: result,
  });
});

const updateTask = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user as JwtPayload;
  const { id } = req.params;
  const taskData = req.body;
  const result = await TaskService.updateTask(email, id, taskData);

  sendResponse<ITask | null>(res, {
    statusCode: 200,
    success: true,
    message: "Task updated successfully!",
    data: result,
  });
});

const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const { id } = req.params;
  const result = await TaskService.deleteTask(user, id);

  sendResponse<ITask | null>(res, {
    statusCode: 200,
    success: true,
    message: "Task deleted successfully!",
    data: result,
  });
});

export const TaskController = {
  addTask,
  getAllTasks,
  getSingleTask,
  getMyTasks,
  updateTask,
  deleteTask,
};
