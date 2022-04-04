import { Request, Response } from "express";
import { UserRepository } from "../repositories/implementations/UserRepository";
import { AuthenticationService } from "../services/AuthenticationService";

const userRepository = new UserRepository();
const authentationService = new AuthenticationService(userRepository);
class AuthenticationController {
    async authenticateUser(request: Request, response: Response): Promise<Response>{
        const { email, password} = request.body;
        try{
            const token = await authentationService.authenticateUser({email, password});
            return response.status(200).send(token);
        }catch(err){
            return response.status(500).json(err.message)
        }
    }

}

export { AuthenticationController };

