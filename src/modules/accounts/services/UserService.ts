import { hash } from "bcryptjs";
import { ICreateUserDTO } from "../dto/ICreateUserDTO";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/IUserRepository";

export class UserService {
    constructor(private userRepository: IUserRepository){}

    async createUser({name, username, email, password, driver_license}: ICreateUserDTO ):Promise<void>{
        const userAlreadyExists = await this.userRepository.findByuserame(username);

        if(userAlreadyExists){
            throw new Error("User already exists.")
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

}