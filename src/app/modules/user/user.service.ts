import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import User from "./user.model";
import { IUser } from "./user.interface";

const getUsers = async (userInfo: Partial<IUser>): Promise<IUser[] | null> => {
  if (userInfo.role !== "admin") {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidded Access");
  }
  const users = await User.find({});

  return users;
};

// single user
const getSingleUser = async (
  userInfo: Partial<IUser>
): Promise<IUser | null> => {
  const user = await User.findOne({ email: userInfo.email });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  return user;
};

const updateUser = async (
  email: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const updatedUser = await User.findOneAndUpdate({ email: user.email }, data);

  return updatedUser;
};

export const UserService = {
  getUsers,
  getSingleUser,
  updateUser,
};
