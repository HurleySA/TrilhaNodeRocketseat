import { Router } from "express";
import multer from "multer";
import { CreateCategoryController } from "../controller/CreateCategoryController";


const categoriesRoutes = Router();
const upload = multer({
    dest: "./tmp",

})
const createCategoryController = new CreateCategoryController();

categoriesRoutes.get("/", (request, response) => {
    createCategoryController.listCategories(request, response);
});

categoriesRoutes.post("/", (request, response) => {
    createCategoryController.createCategory(request, response);   
});

categoriesRoutes.post("/import", upload.single("file"), (request, response)=>{
    const { file } = request;
    console.log(file);
    return response.send();

})

export { categoriesRoutes };

