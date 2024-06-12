import express from "express";
import { TaskController } from "./task.controller";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middleware/auth";

const router = express.Router();

router.get(
  "/all",
  // auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  TaskController.getAllTasks
);

router.get(
  "/myTasks",
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  TaskController.getMyTasks
);

router.get(
  "/:id",
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  TaskController.getSingleTask
);

router.post(
  "/add",
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  TaskController.addTask
);

router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  TaskController.updateTask
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  TaskController.deleteTask
);

export const taskRoutes = router;
