// Este arquivo contém o controller responsável por lidar com requisições relacionadas a usuários.

import { Request, Response } from "express";
import { z } from "zod";

// Classe responsável por controlar ações relacionadas a usuários, incluindo criação.
class UsersController {
  // Método que valida o corpo da requisição e extrai os dados para criação de um usuário.
  create(request: Request, response: Response) {
    // Schema de validação do corpo da requisição usando zod, garantindo formato e regras para os campos.
    const bodySchema = z.object({
      name: z.string().trim().min(2),
      email: z.string().email(),
      password: z.string().min(6),
    });

    // Valida o corpo da requisição e extrai as variáveis name, email e password.
    const { name, email, password } = bodySchema.parse(request.body);

    // Retorna uma resposta JSON com uma mensagem de confirmação.
    return response.json({ message: "ok" });
  }
}

export { UsersController };
