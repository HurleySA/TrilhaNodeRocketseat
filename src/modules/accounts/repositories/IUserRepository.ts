import { ICreateUserDTO } from "../dto/ICreateUserDTO";
import { User } from "../entities/User";



interface IUserRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByuserame(username: string ): Promise<User>;
    list(): Promise<User[]> 
}

export { IUserRepository };

