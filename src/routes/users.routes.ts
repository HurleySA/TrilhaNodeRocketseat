import { Router } from "express";
import { UserController } from "../modules/accounts/controller/UserController";

const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/", (request, response) => {
    userController.createUser(request, response);
})

userRoutes.get("/", (request, response) => {
    userController.listUsers(request, response);
})

export { userRoutes };

