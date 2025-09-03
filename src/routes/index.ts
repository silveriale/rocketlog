// Centraliza e organiza todas as rotas da aplicação.

import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { deliveriesRoutes } from "./deliveries-routes";
import { deliveryLogsRoutes } from "./delivery-logs-routes";

const routes = Router(); // Cria o roteador principal que agrupa os módulos de rotas.
routes.use("/users", usersRoutes); // Define as rotas relacionadas a usuários no caminho "/users".
routes.use("/sessions", sessionsRoutes); // Define as rotas de sessões no caminho "/sessions" para autenticação dos usuários.
routes.use("/deliveries", deliveriesRoutes); // Define as rotas de entregas no caminho "/deliveries" para gerenciamento e atualização do status das entregas.
routes.use("/delivery-logs", deliveryLogsRoutes); // Define as rotas de logs de entregas no caminho "/delivery-logs" para registrar e consultar logs relacionados às entregas.

export { routes };
