import { Request, Response } from "express";
import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRepository = new CategoriesRepository();
const createCategoryService = new CreateCategoryService(categoriesRepository);
class CreateCategoryController {
    async createCategory(request:Request, response: Response):Promise<Response>{
        const { name, description } = request.body;
        try{
            await createCategoryService.createCategory({name, description});
            return response.status(201).send();
        }catch(err){
            return response.status(400).json(err.message)
        }
    }

    async listCategories(request:Request, response: Response):Promise<Response>{
        try{
            const categories = await createCategoryService.listCategories();
            return response.status(200).send(categories);
        }catch(err){
            return response.status(500).json(err.message)
        }
        
    }
    async importCategory(request:Request, response: Response):Promise<Response>{
        const { file } = request;
        try{
            await createCategoryService.createImport(file);
            return response.send();
        }catch(err){
            return response.status(400).json(err.message)
        }
        
    }
    
}

export { CreateCategoryController };

