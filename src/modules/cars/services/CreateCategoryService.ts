import { parse } from "csv-parse";
import fs from "fs";
import { Category } from "../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../repositories/ICategoriesRepository";
"csv-parse";

interface IImportData {
    name: string,
    description: string,
}

export class CreateCategoryService{
    constructor(private categoriesRepository: ICategoriesRepository){}

    async createCategory({name, description}:ICreateCategoryDTO):Promise<void>{
        const existCategory = await this.categoriesRepository.findByName(name);
        if (existCategory) {
            throw new Error("Category already exist.")
        }
        this.categoriesRepository.create({ name, description });
    }

    async listCategories(): Promise<Category[]>{
        return this.categoriesRepository.list();
    }

    async createImport(file: Express.Multer.File):Promise<void>{
        const categories = await this.loadFunction(file);
        categories.map(async (category) => {
            const { name, description } = category;
            const existCategory = await this.categoriesRepository.findByName(name);
            if (!existCategory) {
                await this.categoriesRepository.create({ name, description });
            }
        })
    }

    async loadFunction(file: Express.Multer.File):Promise<IImportData[]>{
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportData[] = [];
            const parseFile = parse();
            stream.pipe(parseFile);

            parseFile.on("data", async (line) => {
                const [ name, description ] = line;
                categories.push({
                    name,
                    description
                })
            }).on("end", () => {
                fs.promises.unlink(file.path)
                resolve(categories);
            }).on("error", (err) => {
                reject(err);
            })
        });
    }
}
