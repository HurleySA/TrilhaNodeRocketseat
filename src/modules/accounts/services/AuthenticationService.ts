import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IUserRepository } from "../repositories/IUserRepository";

interface IRequest {
    email: string,
    password: string
}
interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string
}

export class AuthenticationService {
    constructor(private userRepository: IUserRepository){}

    async authenticateUser({email, password}: IRequest): Promise<IResponse>{
        const user = await this.userRepository.findByemail(email);

        if(!user){
            throw new Error("Email or password incorrect!");
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("Email or password incorrect!");
        }

        const token = sign({}, "bcd040c2a45fcdd9d0c3ef1c0354c82d", {
            subject: user.id,
            expiresIn: "1d"
        });

        const newUser = {
            name: user.name,
            email: user.email
        }

        return { 
            user: newUser,
            token
        }

    }
}