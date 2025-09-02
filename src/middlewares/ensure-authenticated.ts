// Este arquivo define um middleware do Express que garante que a requisição possui um JWT válido. Ele verifica o token JWT no header de autorização, decodifica suas informações e adiciona os dados do usuário ao objeto da requisição.

import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";

// Interface que define o formato do payload do token JWT
interface TokenPayload {
  role: string;
  sub: string;
}

// Middleware para garantir que o usuário está autenticado
function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Obtém o header de autorização da requisição
    const authHeader = request.headers.authorization;

    // Se não existir o header, lança um erro
    if (!authHeader) {
      throw new AppError("JWT token não encontrado!");
    }
    // Separa o tipo do token e o próprio token (ex: "Bearer <token>")
    const [, token] = authHeader.split(" ");

    // Verifica e decodifica o token JWT usando o segredo da aplicação
    const { role, sub: user_id } = verify(
      token,
      authConfig.jwt.secret
    ) as TokenPayload;

    // Adiciona as informações do usuário autenticado no objeto request
    request.user = {
      id: user_id,
      role,
    };

    // Chama o próximo middleware
    return next();
  } catch (error) {
    // Se o token for inválido, lança um erro de autenticação
    throw new AppError("JWT token inválido!", 401);
  }
}
