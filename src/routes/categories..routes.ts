import { response, Router } from "express";
import { v4 as uuidV4 } from "uuid";

import { Category } from "../model/Category";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get("/", (request, response) => {
    const categories = categoriesRepository.list();
    return response.status(200).send(categories);
});

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;
    const existCategory = categoriesRepository.findByName(name);
    if (existCategory) {
        return response.status(400).send({ message: "Category already exist" });
    }
    categoriesRepository.create({ name, description });
    return response.status(201).send();
});

export { categoriesRoutes };
