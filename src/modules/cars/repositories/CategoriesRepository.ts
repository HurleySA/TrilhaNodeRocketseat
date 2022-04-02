import { Category as C } from "../../../database/entity/Category";
import { AppDataSource } from "../../../database/index";
import { Category } from "../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private categories: Category[];

    constructor() {
        this.categories = [];
    }

    create({ name, description }: ICreateCategoryDTO): void {
        const category: Category = new C();
        
        Object.assign(category, {
            name,
            description,
            created_at: new Date(),
        });
        AppDataSource.manager.save(category);
        this.categories.push(category);
    }

    list(): Category[] {
        const categories = AppDataSource.manager.find(C);
        return this.categories;
    }

    findByName(name: string): Category {
        const category = this.categories.find(
            (category) => category.name === name
        );
        return category;
    }
}

export { CategoriesRepository };

