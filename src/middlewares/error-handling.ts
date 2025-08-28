import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

// Define um middleware para tratar erros na aplicação
export function errorHandling(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Verifica se o erro é do tipo AppError
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message }); // Retorna a resposta com o status e mensagem definidos pelo erro personalizado
  }

  // Retorna um erro genérico (status 500) caso não seja um AppError
  return response.status(500).json({ message: error.message });
}
