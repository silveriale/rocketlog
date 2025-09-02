// Este arquivo configura os parâmetros de autenticação da aplicação,  especificamente as configurações para a geração e validação de tokens JWT.

export const authConfig = {
  // Configurações relacionadas ao JWT (JSON Web Token)
  jwt: {
    // Segredo utilizado para assinar e verificar o token JWT, obtido das variáveis de ambiente
    secret: process.env.JWT_SECRET,
    // Tempo de expiração do token JWT, neste caso 1 dia
    expiresIn: "1d",
  },
};
