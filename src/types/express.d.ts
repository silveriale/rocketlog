// Este arquivo estende os tipos do Express para adicionar informações do usuário autenticado ao objeto Request, permitindo tipagem segura ao acessar dados do usuário nas rotas.

declare namespace Express {
  // Extende a interface Request do Express para incluir a propriedade 'user'
  export interface Request {
    // Propriedade opcional 'user' que contém informações do usuário autenticado
    user?: {
      // Identificador único do usuário
      id: string;
      // Papel ou função do usuário (ex: admin, user)
      role: string;
    };
  }
}

