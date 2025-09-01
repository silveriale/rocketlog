// Este arquivo contém o controller responsável por lidar com requisições relacionadas a usuários.

import { Request, Response } from "express";
import { hash } from "bcrypt";
import { z } from "zod";

// Classe responsável por controlar ações relacionadas a usuários, incluindo criação.
class UsersController {
  // Método que valida o corpo da requisição, gera o hash da senha e retorna os dados processados.
  async create(request: Request, response: Response) {
    // Schema de validação do corpo da requisição usando zod, garantindo formato e regras para os campos.
    const bodySchema = z.object({
      name: z.string().trim().min(2),
      email: z.string().email(),
      password: z.string().min(6),
    });

    // Valida o corpo da requisição e extrai as variáveis name, email e password.
    const { name, email, password } = bodySchema.parse(request.body);

    // Gera uma senha criptografada com fator de custo 8.
    const hashedPassword = await hash(password, 8);

    // Retorna uma resposta JSON com uma mensagem de confirmação junto com a senha criptografada (apenas para teste).
    return response.json({ message: "ok", hashedPassword });
  }
}

export { UsersController };
