// Este arquivo configura a aplicação Express, registrando middlewares e rotas.

import express from "express";
import "express-async-errors";
import { routes } from "./routes";
import { errorHandling } from "./middlewares/error-handling";

// Cria uma instância da aplicação Express.
const app = express();

// Adiciona um middleware para interpretar JSON no corpo das requisições.
app.use(express.json());

// Registra as rotas da aplicação.
app.use(routes);

// Adiciona o middleware global de tratamento de erros, que captura e responde erros.
app.use(errorHandling);

export { app };
