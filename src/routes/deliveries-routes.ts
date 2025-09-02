// Este arquivo centraliza as rotas relacionadas às entregas, aplicando autenticação e autorização, e definindo os endpoints para operações de entregas.

import { Router } from "express";

import { DeliveriesController } from "@/controlles/deliveries-controller";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const deliveriesRoutes = Router(); // Cria uma instância de rotas para entregas

const deliveriesController = new DeliveriesController(); // Instancia o controlador de entregas

deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"])); // Aplica os middlewares de autenticação e autorização (apenas usuários com role "sale" (vendedor) podem acessar as rotas de entregas)
deliveriesRoutes.post("/", deliveriesController.create); // Define a rota POST para criação de uma nova entrega
deliveriesRoutes.get("/", deliveriesController.index); // Define a rota GET para listar todas as entregas cadastradas

export { deliveriesRoutes }; 
