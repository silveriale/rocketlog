// Este arquivo define as rotas relacionadas a sessões, configurando endpoints para criação de sessões utilizando o controlador apropriado.

import { Router } from "express";

import { SessionsController } from "@/controlles/sessions-controller";

const sessionsRoutes = Router(); // Cria uma instância do Router para as rotas de sessões
const sessionsController = new SessionsController(); // Instancia o controlador de sessões

sessionsRoutes.post("/", sessionsController.create); // Define a rota POST "/" que chama o método create do controlador de sessões

export { sessionsRoutes }; // Exporta as rotas de sessões para serem usadas em outras partes da aplicação

