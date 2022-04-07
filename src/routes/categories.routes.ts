import { Router } from "express";
import multer from "multer";
import upload from "../config/upload";
import { CreateCategoryController } from "../modules/cars/controller/CreateCategoryController";


const categoriesRoutes = Router();

const uploadAvatar = multer(upload.upload("./tmp/categories"));

const createCategoryController = new CreateCategoryController();

categoriesRoutes.get("/", (request, response) => {
    createCategoryController.listCategories(request, response);
});

categoriesRoutes.post("/", (request, response) => {
    createCategoryController.createCategory(request, response);   
});

categoriesRoutes.post("/import", uploadAvatar.single("file"), (request, response)=>{
    createCategoryController.importCategory(request, response);
})

export { categoriesRoutes };

