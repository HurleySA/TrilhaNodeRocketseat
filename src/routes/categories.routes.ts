import { Router } from "express";
import { CreateCategoryController } from "../controller/CreateCategoryController";


const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();

categoriesRoutes.get("/", (request, response) => {
    createCategoryController.listCategories(request, response);
});

categoriesRoutes.post("/", (request, response) => {
    createCategoryController.createCategory(request, response);   
});

export { categoriesRoutes };

