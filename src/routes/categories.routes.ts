import { Router } from "express";
import multer from "multer";
import { CreateCategoryController } from "../modules/cars/controller/CreateCategoryController";


const categoriesRoutes = Router();
const upload = multer({
    dest: "./tmp",

})
const createCategoryController = new CreateCategoryController();

categoriesRoutes.get("/", (request, response) => {
    console.log("Teste")
    createCategoryController.listCategories(request, response);
});

categoriesRoutes.post("/", (request, response) => {
    createCategoryController.createCategory(request, response);   
});

categoriesRoutes.post("/import", upload.single("file"), (request, response)=>{
    createCategoryController.importCategory(request, response);
})

export { categoriesRoutes };

