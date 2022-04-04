import { AppError } from "../../../erros/AppError";
import { Specification } from "../entities/Specification";
import { ISpescificationRepository } from "../repositories/ISpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

export class CreateSpecificationService{
    constructor(private specificationsRepository: ISpescificationRepository){}
    async createSpecification({name, description}: IRequest):Promise<void>{
        const specificationAlreadyExists = await this.specificationsRepository.findByname(name);
        
        if(specificationAlreadyExists){
            throw new AppError("Specification already exists.")
        }
        await this.specificationsRepository.create({
            name, 
            description
        })
    }

    async listCategories(): Promise<Specification[]>{
        return await this.specificationsRepository.list();
    }

    
}