import { Request, Response } from "express";
import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRepository = new CategoriesRepository();
const createCategoryService = new CreateCategoryService(categoriesRepository);
class CreateCategoryController {
    createCategory(request:Request, response: Response){
        const { name, description } = request.body;
        try{
            createCategoryService.createCategory({name, description});
            return response.status(201).send();
        }catch(err){
            return response.status(400).json(err.message)
        }
    }

    listCategories(request:Request, response: Response){
        try{
            const categories = createCategoryService.listCategories();
            return response.status(200).send(categories);
        }catch(err){
            return response.status(500).json(err.message)
        }
        
    }
    importCategory(request:Request, response: Response){
        const { file } = request;
        try{
            createCategoryService.createImport(file);
            return response.send();
        }catch(err){
            return response.status(400).json(err.message)
        }
        
    }
    
}

export { CreateCategoryController };

