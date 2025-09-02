// Este arquivo define o controlador de sessões, responsável por gerenciar autenticação e operações relacionadas a sessões de usuários.

import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma";
import { compare } from "bcrypt";
import { z } from "zod";

class SessionsController {
  async create(request: Request, response: Response) {
    // Validação do corpo da requisição: garante que o email e a senha estejam no formato correto
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    // Extração e validação dos dados enviados pelo cliente
    const { email, password } = bodySchema.parse(request.body);

    // Busca o usuário no banco de dados pelo email fornecido
    const user = await prisma.user.findFirst({ where: { email } });

    // Se o usuário não for encontrado, lança um erro de autenticação
    if (!user) {
      throw new AppError("Email ou senha inválida!", 401);
    }

    // Compara a senha fornecida com o hash armazenado no banco de dados
    const passwordMatched = await compare(password, user.password);

    // Se a senha não corresponder, lança um erro de autenticação
    if (!passwordMatched) {
      throw new AppError("Email ou senha inválida!", 401);
    }

    // Retorna uma resposta temporária de sucesso (deve ser substituída por token JWT ou dados da sessão futuramente)
    return response.json({ message: "ok" });
  }
}

export { SessionsController }; 
