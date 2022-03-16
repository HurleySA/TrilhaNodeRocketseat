import { Router } from "express";
import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";


const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get("/", (request, response) => {
    const categories = categoriesRepository.list();
    return response.status(200).send(categories);
});

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;
    const createCategoryService = new CreateCategoryService(categoriesRepository);
    try{
        createCategoryService.execute({name, description});
        return response.status(201).send();
    }catch(err){
        return response.status(400).json(err.message)
    }
    
});

export { categoriesRoutes };

