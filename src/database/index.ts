import { AppDataSource } from "./data-source";
import { Category } from "./entity/Category";

AppDataSource.initialize().then(async () => {
    console.log("Inserting a new user into the database...")
    const category: Category = new Category();
        Object.assign(category, {
            name:"Matheus",
            description:"Programador",
            created_at: new Date(),
        });
    await AppDataSource.manager.save(category)

}).catch((err)=> console.log(err))