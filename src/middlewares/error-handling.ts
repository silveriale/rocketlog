import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { ZodError } from "zod";

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

  // Verifica se o erro veio da validação do Zod
  if (error instanceof ZodError) {
    return response.status(400).json({ // Retorna resposta com status 400 (erro de validação)
      message: "validation error", // Define a mensagem de erro como "validation error"
      issues: error.format(), // Retorna os detalhes formatados dos erros de validação do Zod
    }); 
  } 

  // Retorna um erro genérico (status 500) caso não seja um AppError ou erro de validação 
  return response.status(500).json({ message: error.message });
}
