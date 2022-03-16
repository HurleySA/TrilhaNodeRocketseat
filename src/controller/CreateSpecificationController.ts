import { Request, Response } from "express";
import { SpecificationRepository } from "../modules/cars/repositories/SpecificationRepository";
import { CreateSpecificationService } from "../services/CreateSpecificationService";

const specificationsRepository = new SpecificationRepository();

class CreateSpecificationController{
    createSpecification(request:Request, response:Response){
        const { name, description} = request.body;

        const createSpecificationService = new CreateSpecificationService(specificationsRepository);
        try{
            createSpecificationService.execute({name, description});
            return response.status(201).send();
        }catch(err){
            return response.status(400).json(err.message);
        }
    }

    listSpecification(request:Request, response: Response){
        const categories = specificationsRepository.list();
        return response.status(200).send(categories);
    }
}

export { CreateSpecificationController };

