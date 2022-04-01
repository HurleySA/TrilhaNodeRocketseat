import { ISpescificationRepository } from "../repositories/ISpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

export class CreateSpecificationService{
    constructor(private specificationsRepository: ISpescificationRepository){}
    execute({name, description}: IRequest):void{
        const specificationAlreadyExists = this.specificationsRepository.findByname(name);
        
        if(specificationAlreadyExists){
            throw new Error("Specification already exists.")
        }
        this.specificationsRepository.create({
            name, 
            description
        })
    }
}