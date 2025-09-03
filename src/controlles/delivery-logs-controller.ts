// Este arquivo define o controller responsável pela criação de logs de entrega, garantindo que apenas entregas válidas e com status adequado possam receber registros.

import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma";
import { z } from "zod";

// Define a classe responsável pelos logs de entrega
class DeliveryLogsController {
  // Método assíncrono para criar um novo log de entrega
  async create(request: Request, response: Response) {
    // Define o esquema de validação para o corpo da requisição usando zod
    const bodySchema = z.object({
      delivery_id: z.string().uuid(),
      description: z.string(),
    });

    const { delivery_id, description } = bodySchema.parse(request.body); // Faz o parsing e validação do corpo da requisição conforme o esquema definido

    // Busca a entrega no banco de dados pelo ID fornecido
    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
    });

    // Se a entrega não for encontrada, lança um erro 404
    if (!delivery) {
      throw new AppError("Entrega não encontrada!", 404);
    }

    // Se o status da entrega for "processing", impede a criação do log e lança um erro
    if (delivery.status === "processing") {
      throw new AppError("Mude o status para enviado (shipped)");
    }

    // Cria o log de entrega no banco de dados com o deliveryId e a descrição fornecidos
    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description,
      },
    });

    return response.status(201).json(); // Retorna resposta de sucesso com status 201 (Created)
  }

  async show(request: Request, response: Response) {
    // Define o esquema de validação para os parâmetros da requisição
    const paramsSchema = z.object({
      delivery_id: z.string().uuid(),
    });

    // Faz o parsing e validação dos parâmetros recebidos
    const { delivery_id } = paramsSchema.parse(request.params);

    // Busca a entrega no banco de dados pelo ID fornecido, incluindo os logs e o usuário associado
    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
      include: {
        logs: true,
        user: true,
      },
    });

    // Verifica se o usuário é um cliente e se está tentando acessar uma entrega que não pertence a ele; caso afirmativo, lança um erro de autorização
    if (
      request.user?.role === "customer" &&
      request.user.id !== delivery?.userId
    ) {
      throw new AppError(
        "O usuário só pode visualizar seus próprios pedidos!",
        401
      );
    }

    // Retorna os dados da entrega junto com os logs e informações do usuário em formato JSON
    return response.json(delivery);
  }
}

export { DeliveryLogsController };
