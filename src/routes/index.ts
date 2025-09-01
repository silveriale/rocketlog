// Este arquivo centraliza e organiza as rotas da aplicação.

import { Router } from "express";
import { usersRoutes } from "./users-routes";

// Cria um novo objeto de rotas principal da aplicação.
const routes = Router();

// Registra as rotas de usuários no caminho "/users".
routes.use("/users", usersRoutes);

export { routes };
