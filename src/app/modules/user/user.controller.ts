import { Request, Response } from "express";
import catchAsync from "../../../shared/createAsync";
import { UserService } from "./user.service";
import { JwtPayload } from "jsonwebtoken";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const { email, role } = req.user as JwtPayload;
  const result = await UserService.getUsers({ email, role });

  sendResponse<IUser[] | null>(res, {
    statusCode: 200,
    success: true,
    message: "Users fetched successfully !",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user as JwtPayload;
  const result = await UserService.getSingleUser({ email });

  sendResponse<IUser | null>(res, {
    statusCode: 200,
    success: true,
    message: "User fetched successfully !",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user as JwtPayload;
  const data = req.body;
  const result = await UserService.updateUser(email, data);

  sendResponse<IUser | null>(res, {
    statusCode: 200,
    success: true,
    message: "User updated successfully !",
    data: result,
  });
});

export const UserController = {
  getUsers,
  getSingleUser,
  updateUser,
};
