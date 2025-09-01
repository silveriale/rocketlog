// Este arquivo contém o controller responsável por lidar com requisições relacionadas a usuários.

import { Request, Response } from "express";

// Classe responsável por controlar as ações relacionadas a usuários.
class UsersController {
  // Recebe a requisição e a resposta como parâmetros.
  create(request: Request, response: Response) {
    // Retorna uma resposta JSON com uma mensagem de confirmação.
    return response.json({ message: "ok" });
  }
}

export { UsersController };
