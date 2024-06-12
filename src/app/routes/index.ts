import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { taskRoutes } from "../modules/task/task.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/task",
    route: taskRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
