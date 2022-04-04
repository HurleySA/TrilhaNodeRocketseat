import { Request, Response } from "express";
import { UserRepository } from "../repositories/implementations/UserRepository";
import { UserService } from "../services/UserService";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
class UserController {
    async createUser(request: Request, response: Response): Promise<Response>{
        const { name, username, password, email, driver_license } = request.body;
        try{
            await userService.createUser({name, username, password,email,driver_license});
            return response.status(201).send();
        }catch(err){
            return response.status(400).json(err.message)
        }

    }

}

export { UserController };

