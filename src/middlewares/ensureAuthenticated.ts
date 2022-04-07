import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../erros/AppError";
import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository";

interface IPayload {
    sub: string
}

export async function ensureAuthenticated(request:Request,response:Response,next:NextFunction){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try{
        const { sub : user_id } = verify(token, "bcd040c2a45fcdd9d0c3ef1c0354c82d") as IPayload;

        const userRepository = new UserRepository();
        const user = userRepository.findByid(user_id);

        if(!user){
            throw new AppError("User does not exists!", 401)
        }

        request.user = { id: user_id };

        next()
    }catch{
        throw new AppError("Invalid token", 401)
    }
    
     
}