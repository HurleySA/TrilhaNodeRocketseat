import { Specification } from "../model/Specification";
import { ICreateCategoryDTO } from "./ICategoriesRepository";
import { ISpescificationRepository } from "./ISpecificationRepository";

class SpecificationRepository implements ISpescificationRepository {
    private specifications: Specification[];

    constructor(){
        this.specifications = [];
    }
    findByname(name: string):Specification {
        const specification = this.specifications.find(specification => specification.name === name);
        return specification;
    }
    create({name, description}:ICreateCategoryDTO):void{
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });
        this.specifications.push(specification);
    }

    list(): Specification[] {
        return this.specifications;
    }
}

export { SpecificationRepository };

