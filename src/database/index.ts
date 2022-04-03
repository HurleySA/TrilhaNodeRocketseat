import "reflect-metadata";
import { DataSource } from "typeorm";
import { Category } from "../modules/cars/entities/Category";


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
    migrations: ["./migrations/*.ts"],
    migrationsTableName: "custom_migration_table",
})

AppDataSource.initialize().then(async () => {
    console.log("Initializing the database...")
}).catch((err)=> console.log(err))