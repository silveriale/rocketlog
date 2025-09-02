// Este arquivo define o controlador responsável por gerenciar as entregas, incluindo a criação de novas entregas.

import { Request, Response } from "express";

class DeliveriesController {
  create(request: Request, response: Response) {
    // Método para criar uma nova entrega, recebe a requisição e resposta
    return response.json({ message: "ok" }); // Retorna uma resposta JSON com a mensagem "ok"
  }
}

export { DeliveriesController };
