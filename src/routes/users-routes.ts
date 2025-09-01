// Este arquivo define as rotas relacionadas a usuários, utilizando o Express.

import { Router } from "express";
import { UsersController } from "@/controlles/users-controller";

// Cria um novo objeto de rotas para usuários.
const usersRoutes = Router();

// Instancia o controller de usuários, para manipular as requisições.
const usersController = new UsersController();

// Define a rota GET "/" que chama o método create do UsersController.
usersRoutes.get("/", usersController.create);

export { usersRoutes };
