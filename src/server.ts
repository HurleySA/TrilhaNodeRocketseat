import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import "./database";
import { AppError } from "./erros/AppError";
import { router } from "./routes";
import swaggerDocument from './swagger.json';



const app = express();

app.use(express.json());
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            message: err.message
        })
    }
    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
    })
})


app.listen(3333, () => console.log("Server is running"));
