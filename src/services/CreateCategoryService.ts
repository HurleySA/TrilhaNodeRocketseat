import { parse } from "csv-parse";
import fs from "fs";
import { Category } from "../modules/cars/model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../modules/cars/repositories/ICategoriesRepository";
"csv-parse";

export class CreateCategoryService{
    constructor(private categoriesRepository: ICategoriesRepository){}

    createCategory({name, description}:ICreateCategoryDTO):void{
        const existCategory = this.categoriesRepository.findByName(name);
        if (existCategory) {
            throw new Error("Category already exist.")
        }
        this.categoriesRepository.create({ name, description });
    }

    listCategories(): Category[]{
        return this.categoriesRepository.list();
    }

    createImport(file: Express.Multer.File):void{
        const stream = fs.createReadStream(file.path);
        const parseFile = parse();
        stream.pipe(parseFile);

        parseFile.on("data", async (line) => {
            console.log(line);
        })
    }
}