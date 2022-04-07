import { Request, Response } from "express";
import { UserRepository } from "../repositories/implementations/UserRepository";
import { UserService } from "../services/UserService";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
class UserController {
    async listUsers(request: Request, response: Response) {
        try{
            const users = await userService.listCategories();
            return response.status(200).send(users);
        }catch(err){
            return response.status(500).json(err.message)
        }
    }
    async createUser(request: Request, response: Response): Promise<Response>{
        const { name, username, password, email, driver_license } = request.body;
        try{
            await userService.createUser({name, username, password,email,driver_license});
            return response.status(201).send();
        }catch(err){
            return response.status(400).json(err.message)
        }

    }

    async updateUserAvatar(request: Request, response: Response): Promise<Response>{
        try{
            const { id } = request.user;
            const avatar_file = request.file.filename;
            await userService.updateUserAvatar({user_id: id, avatar_file})
            
            return response.status(204).send();
        }catch(err){
            return response.status(400).json(err.message)
        }
    }

}

export { UserController };

