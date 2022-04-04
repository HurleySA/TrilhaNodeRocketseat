import { Specification } from "../entities/Specification";


interface ICreateSpecificationDTO{
    name: string;
    description:string;
}

interface ISpescificationRepository{
    create({name,description}:ICreateSpecificationDTO):Promise<void>;
    findByname(name:string):Promise<Specification>;
    list():Promise<Specification[]>;

}

export { ISpescificationRepository, ICreateSpecificationDTO };

