import "reflect-metadata";
import { DataSource } from "typeorm";
import { Category } from "./entity/Category";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "database",
    port: 5432,
    username: "docker",
    password: "1234",
    database: "rentx",
    synchronize: true,
    logging: false,
    entities: [Category],
})

AppDataSource.initialize().then(async () => {
    console.log("Initializing the database...")
}).catch((err)=> console.log(err))