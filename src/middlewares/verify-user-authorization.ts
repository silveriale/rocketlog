// Este arquivo define um middleware para verificar se o usuário tem autorização baseada no seu papel (role) antes de permitir o acesso à rota.

import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

function verifyUserAuthorization(role: string[]) {
  // Função que recebe um array de roles autorizadas
  return (request: Request, response: Response, next: NextFunction) => {
    // Retorna um middleware do Express
    if (!request.user) {
      // Verifica se o usuário está presente na requisição
      throw new AppError("Não autorizado", 401); // Se não estiver, lança um erro 401 (não autorizado)
    }

    if (!role.includes(request.user.role)) {
      // Verifica se o role do usuário está entre os roles autorizados
      throw new AppError("Não autorizado", 401); // Se não estiver, lança um erro 401 (não autorizado)
    }
    return next(); // Se tudo estiver ok, chama o próximo middleware
  };
}

export { verifyUserAuthorization };
