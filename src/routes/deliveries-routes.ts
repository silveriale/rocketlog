// Este arquivo gerencia as rotas relacionadas às entregas, aplicando autenticação e definindo endpoints para operações de entregas.

import { Router } from "express";

import { DeliveriesController } from "@/controlles/deliveries-controller";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const deliveriesRoutes = Router(); // Cria uma instância de rotas para entregas

const deliveriesController = new DeliveriesController(); // Instancia o controlador de entregas

deliveriesRoutes.use(ensureAuthenticated); // Aplica o middleware de autenticação a todas as rotas de entregas
deliveriesRoutes.post("/", deliveriesController.create); // Define a rota POST para criar uma nova entrega

export { deliveriesRoutes }; // Exporta as rotas de entregas
