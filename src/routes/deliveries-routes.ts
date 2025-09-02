// Este arquivo gerencia as rotas relacionadas às entregas, aplicando autenticação e definindo endpoints para operações de entregas.

import { Router } from "express";

import { DeliveriesController } from "@/controlles/deliveries-controller";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const deliveriesRoutes = Router(); // Cria uma instância de rotas para entregas

const deliveriesController = new DeliveriesController(); // Instancia o controlador de entregas

deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"])); // Aplica os middlewares de autenticação e autorização (somente usuários com role "sale"(vendedor) podem acessar as rotas de entregas)
deliveriesRoutes.post("/", deliveriesController.create); // Define a rota POST para criar uma nova entrega

export { deliveriesRoutes }; // Exporta as rotas de entregas
