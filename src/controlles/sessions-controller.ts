// Este arquivo define o controlador de sessões, responsável por gerenciar autenticação e operações relacionadas a sessões de usuários.

import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/configs/auth";
import { prisma } from "@/database/prisma";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { z } from "zod";

class SessionsController {
  // Método responsável por autenticar um usuário com email e senha
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

    // Obtém o segredo e o tempo de expiração para o token JWT a partir das configurações de autenticação
    const { secret, expiresIn } = authConfig.jwt;

    // Gera o token JWT incluindo o papel do usuário (role), assinado com o segredo e tempo de expiração definidos
    const token = sign({ role: user.role ?? "customer" }, secret, {
      subject: user.id,
      expiresIn,
    });

    // Remove a senha do objeto usuário antes de retornar os dados
    const { password: hashedPassword, ...userWithoutPassword } = user;

    // Retorna o token JWT junto com os dados do usuário (sem a senha)
    return response.json({ token, user: userWithoutPassword });
  }
}

export { SessionsController };
