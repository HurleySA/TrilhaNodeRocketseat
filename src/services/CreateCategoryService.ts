import { ICategoriesRepository, ICreateCategoryDTO } from "../modules/cars/repositories/ICategoriesRepository";


export class CreateCategoryService{
    constructor(private categoriesRepository: ICategoriesRepository){}

    execute({name, description}:ICreateCategoryDTO):void{
        const existCategory = this.categoriesRepository.findByName(name);
        if (existCategory) {
            throw new Error("Category already exist.")
        }
        this.categoriesRepository.create({ name, description });
    }
}