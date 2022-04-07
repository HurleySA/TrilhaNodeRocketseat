import { hash } from "bcryptjs";
import { AppError } from "../../../erros/AppError";
import { ICreateUserDTO } from "../dto/ICreateUserDTO";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/IUserRepository";

interface IRequest {
    user_id: string;
    avatar_file: string;
}

export class UserService {
    constructor(private userRepository: IUserRepository){}

    async createUser({name, username, email, password, driver_license}: ICreateUserDTO ):Promise<void>{
        const usernameAlreadyExists = await this.userRepository.findByuserame(username);

        if(usernameAlreadyExists){
            throw new AppError("Username already exist.")
        }

        const useremailAlreadyExists = await this.userRepository.findByemail(email);

        if(useremailAlreadyExists){
            throw new AppError("Email already exist.")
        }

        const passwordHash = await hash(password, 8);
        await this.userRepository.create({
            name,
            username,
            email,
            password:passwordHash,
            driver_license
        })

    }

    async listCategories(): Promise<User[]>{
        return await this.userRepository.list();
    }

    async updateUserAvatar({user_id, avatar_file}: IRequest): Promise<void>{
        const user = await this.userRepository.findByid(user_id);

        user.avatar = avatar_file;

        await this.userRepository.updateUser(user);
    }

}