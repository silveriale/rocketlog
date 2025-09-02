// Este arquivo centraliza e organiza as rotas da aplicação.

import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";

// Cria um novo objeto de rotas principal da aplicação.
const routes = Router();

// Registra as rotas de usuários no caminho "/users".
routes.use("/users", usersRoutes);

// Registra as rotas de sessões no caminho "/sessions" para gerenciamento de autenticação.
routes.use("/sessions", sessionsRoutes);

export { routes };
