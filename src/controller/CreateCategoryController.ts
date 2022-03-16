import { Request, Response } from "express";
import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRepository = new CategoriesRepository();
class CreateCategoryController {
    createCategory(request:Request, response: Response){
        const { name, description } = request.body;
        const createCategoryService = new CreateCategoryService(categoriesRepository);
        try{
            createCategoryService.execute({name, description});
            return response.status(201).send();
        }catch(err){
            return response.status(400).json(err.message)
        }
    }

    listCategories(request:Request, response: Response){
        const categories = categoriesRepository.list();
        return response.status(200).send(categories);
    }
}

export { CreateCategoryController };

