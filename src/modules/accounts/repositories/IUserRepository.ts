import { ICreateUserDTO } from "../dto/ICreateUserDTO";
import { User } from "../entities/User";



interface IUserRepository {
    updateUser(user: User);
    findByemail(email: string):Promise<User>;
    create(data: ICreateUserDTO): Promise<void>;
    findByuserame(username: string ): Promise<User>;
    findByid(id: string):Promise<User>;
    list(): Promise<User[]> 
}

export { IUserRepository };

