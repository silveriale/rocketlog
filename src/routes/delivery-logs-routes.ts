// Este arquivo define as rotas relacionadas aos logs de entregas, aplicando autenticação e autorização para que apenas usuários vendedores possam criar logs

import { Router } from "express";
import { DeliveryLogsController } from "@/controlles/delivery-logs-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const deliveryLogsRoutes = Router(); // Cria um novo roteador do Express para as rotas de logs de entrega
const deliveryLogsController = new DeliveryLogsController(); // Instancia o controller de logs de entrega

// Define a rota POST para criar um novo log de entrega, aplica autenticação e autoriza apenas usuários com perfil "sale" (vendedor)
deliveryLogsRoutes.post(
  "/", // Caminho da rota
  ensureAuthenticated, // Middleware para garantir autenticação
  verifyUserAuthorization(["sale"]), // Middleware para garantir autorização de vendedor
  deliveryLogsController.create // Controller que lida com a criação do log
);

export { deliveryLogsRoutes };
