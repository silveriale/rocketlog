class AppError {
  message: string; // Propriedade que armazena a mensagem de erro
  statusCode: number; // Propriedade que armazena o código de status HTTP associado ao erro

  // Criando um construtor que recebe mensagem e código de status (padrão 400)
  constructor(message: string, statusCode: number = 400) {
    this.message = message; // Atribui a mensagem recebida à propriedade da classe
    this.statusCode = statusCode; // Atribui o código de status recebido à propriedade da classe
  }
}

export { AppError };
