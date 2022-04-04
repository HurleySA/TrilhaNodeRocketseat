import { Router } from "express";
import { AuthenticationController } from "../modules/accounts/controller/AuthenticationController";

const authenticationRoutes = Router();

const authenticationController = new AuthenticationController();

authenticationRoutes.post("/session",  (request, response) => {
    authenticationController.authenticateUser(request, response);
})

export { authenticationRoutes };

