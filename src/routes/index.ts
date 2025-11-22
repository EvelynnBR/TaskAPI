import { Router } from "express"
import { taskRoutes } from "@/routes/task-routes"
import { userRoutes } from "@/routes/user-routes"
import { sessionRoutes } from "./session-routes"

export const routes = Router()

routes.use("/tasks", taskRoutes)
routes.use("/user", userRoutes)
routes.use("/session", sessionRoutes)
