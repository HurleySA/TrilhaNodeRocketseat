import { Router } from "express";
import { CreateSpecificationController } from "../modules/cars/controller/CreateSpecificationController";

const specificationRoutes = Router();
const createSpecificationController = new CreateSpecificationController();
specificationRoutes.get("/", (request, response) => {
    createSpecificationController.listSpecification(request, response);
});
specificationRoutes.post("/", (request, response) => {
    createSpecificationController.createSpecification(request, response);
})

export { specificationRoutes };

