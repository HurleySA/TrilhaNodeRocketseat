import { ICreateUserDTO } from "../dto/ICreateUserDTO";
import { IUserRepository } from "../repositories/IUserRepository";

export class UserService {
    constructor(private userRepository: IUserRepository){}

    async createUser({name, username, email, password, driver_license}: ICreateUserDTO ):Promise<void>{
        const userAlreadyExists = await this.userRepository.findByuserame(username);

        if(userAlreadyExists){
            throw new Error("User already exists.")
        }

        await this.userRepository.create({
            name,
            username,
            email,
            password,
            driver_license
        })

    }

}