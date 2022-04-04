import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database";
import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

class UserRepository implements IUserRepository{
    private repository: Repository<User>

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }
    
    async create(data: ICreateUserDTO): Promise<void> {      
        const { name, username, password, email, driver_license } = data; 
        const user = this.repository.create({
            name,
            username,
            password,
            email,
            driver_license,
            isAdmin: false
        })

        await this.repository.save(user);
    }

    async findByuserame(username: string): Promise<User> {
        const user = await this.repository.findOneBy({username})
        return user;
    }


}

export { UserRepository };

