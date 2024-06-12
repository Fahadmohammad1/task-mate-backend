import express from "express";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { UserController } from "./user.controller";

const router = express.Router();

router.get(
  "/single",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  UserController.getSingleUser
);

router.get("/", auth(ENUM_USER_ROLE.ADMIN), UserController.getUsers);

router.patch(
  "/update",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  UserController.updateUser
);

export const userRoutes = router;
