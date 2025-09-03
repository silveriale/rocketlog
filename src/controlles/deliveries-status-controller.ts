// Este arquivo define um controller responsável por atualizar o status de uma entrega no banco de dados

import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";

class DeliveriesStatusController {
  // Método assíncrono para atualizar o status de uma entrega
  async update(request: Request, response: Response) {
    // Define o esquema de validação para os parâmetros da requisição (params)
    const paramsSchema = z.object({
      id: z.string().uuid(), // O parâmetro 'id' deve ser uma string no formato UUID
    });

    // Define o esquema de validação para o corpo da requisição (body)
    const bodySchema = z.object({
      status: z.enum(["processing", "shipped", "delivered"]), // O status deve ser um dos valores permitidos
    });

    // Faz o parsing(validar e estruturar dados de entrada antes de usá-los)e validação dos parâmetros da requisição
    const { id } = paramsSchema.parse(request.params);
    // Faz o parsing e validação do corpo da requisição
    const { status } = bodySchema.parse(request.body);

    // Atualiza o status da entrega no banco de dados usando o Prisma ORM
    await prisma.delivery.update({
      data: {
        status, // Novo status da entrega
      },
      where: {
        id, // ID da entrega a ser atualizada
      },
    });

    // Retorna uma resposta JSON vazia indicando sucesso
    return response.json();
  }
}

export { DeliveriesStatusController };
