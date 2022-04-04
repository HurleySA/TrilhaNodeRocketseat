import { Router } from "express";
import { UserController } from "../modules/accounts/controller/UserController";

const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/", (request, response) => {
    userController.createUser(request, response);
})

export { userRoutes };

