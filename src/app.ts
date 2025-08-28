import express from "express";
import "express-async-errors";

// Importa o middleware personalizado de tratamento de erros
import { errorHandling } from "./middlewares/error-handling";

// Cria uma instância da aplicação Express
const app = express();

// Adiciona um middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Adiciona o middleware global de tratamento de erros
app.use(errorHandling);

export { app };
