import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "../modules/cars/controller/CreateSpecificationController";

const specificationRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

specificationRoutes.use(ensureAuthenticated);
specificationRoutes.get("/", (request, response) => {
    createSpecificationController.listSpecification(request, response);
});
specificationRoutes.post("/", (request, response) => {
    createSpecificationController.createSpecification(request, response);
})

export { specificationRoutes };

