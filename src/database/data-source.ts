import "reflect-metadata";
import { DataSource } from "typeorm/data-source";
import { Category } from "./entity/Category";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "1234",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [Category],
})