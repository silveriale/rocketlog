// Este arquivo define o controlador que concentra os métodos relacionados às operações de entregas.

import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";

class DeliveriesController {
  // Método responsável por criar uma nova entrega
  async create(request: Request, response: Response) {
    // Definição do schema de validação
    const bodySchema = z.object({
      user_id: z.string().uuid(),
      description: z.string(),
    });

    // Extração e validação dos dados
    const { user_id, description } = bodySchema.parse(request.body);

    // Criação da entrega no banco de dados
    await prisma.delivery.create({
      data: {
        userId: user_id,
        description,
      },
    });

    // Retorna status 201 (criado) sem corpo
    return response.status(201).json();
  }

  // Método responsável por listar todas as entregas
  async index(request: Request, response: Response) {
    // Busca todas as entregas no banco de dados
    const deliveries = await prisma.delivery.findMany();

    // Retorna a lista de entregas em formato JSON
    return response.json(deliveries);
  }
}

export { DeliveriesController };
