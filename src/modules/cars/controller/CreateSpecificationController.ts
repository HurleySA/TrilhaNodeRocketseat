import { Request, Response } from "express";
import { SpecificationRepository } from "../repositories/SpecificationRepository";
import { CreateSpecificationService } from "../services/CreateSpecificationService";

const specificationsRepository = new SpecificationRepository();
const createSpecificationService = new CreateSpecificationService(specificationsRepository);
class CreateSpecificationController{
    async createSpecification(request:Request, response:Response){
        const { name, description} = request.body;
         try{ 
            await createSpecificationService.createSpecification({name, description});
            return response.status(201).send();
         }catch(err){
            return response.status(400).json(err.message);
        } 
    }

    async listSpecification(request:Request, response: Response){
        try{
            const specifications = await createSpecificationService.listCategories();
            return response.status(200).send(specifications);
        }catch(err){
            return response.status(500).json(err.message)
        }
    }
}

export { CreateSpecificationController };

