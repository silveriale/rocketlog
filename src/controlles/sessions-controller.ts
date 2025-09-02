// Este arquivo define o controlador de sessões, responsável por gerenciar operações relacionadas a sessões, como criar uma nova sessão.

import { Request, Response } from "express"; 

class SessionsController {
  create(request: Request, response: Response) { // Método para criar uma nova sessão, recebe request e response
    return response.json({ message: "ok" }); // Retorna uma resposta JSON com a mensagem "ok"
  }
}

export { SessionsController }; // Exporta a classe SessionsController para ser utilizada em outras partes da aplicação

