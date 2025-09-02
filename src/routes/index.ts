// Centraliza e organiza todas as rotas da aplicação.

import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { deliveriesRoutes } from "./deliveries-routes";

// Cria o roteador principal que agrupa os módulos de rotas.
const routes = Router();

// Registra as rotas de usuários no caminho "/users".
routes.use("/users", usersRoutes);

// Registra as rotas de sessões no caminho "/sessions" para autenticação de usuários.
routes.use("/sessions", sessionsRoutes);

// Registra as rotas de entregas no caminho "/deliveries" para gerenciamento de entregas.
routes.use("/deliveries", deliveriesRoutes);

export { routes };
