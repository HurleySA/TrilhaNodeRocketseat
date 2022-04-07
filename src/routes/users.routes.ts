import { Router } from "express";
import multer from "multer";
import upload from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UserController } from "../modules/accounts/controller/UserController";

const userRoutes = Router();

const uploadAvatar = multer(upload.upload("./tmp/avatar"));

const userController = new UserController();

userRoutes.post("/", (request, response) => {
    userController.createUser(request, response);
})

userRoutes.get("/", (request, response) => {
    userController.listUsers(request, response);
})

userRoutes.patch("/avatar",ensureAuthenticated,uploadAvatar.single("avatar"), (request, response) => {
    userController.updateUserAvatar(request, response);
})

export { userRoutes };

