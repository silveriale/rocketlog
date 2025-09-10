// Define as configurações de autenticação da aplicação, em especial os parâmetros do JWT.

import { env } from "../env";
import type { SignOptions } from "jsonwebtoken";

// Define a tipagem do JWT para alinhar com o pacote jsonwebtoken, garantindo que expiresIn seja aceito corretamente pelo TypeScript
type JWTConfig = {
  secret: string;
  expiresIn: SignOptions["expiresIn"]; // mantém o tipo alinhado com a biblioteca jsonwebtoken
};

export const authConfig: { jwt: JWTConfig } = {
  // Configurações relacionadas ao JWT (JSON Web Token)
  jwt: {
    // Segredo utilizado para assinar e verificar o token JWT. Obtido do env.ts e deve estar definido nas variáveis de ambiente.
    secret: env.JWT_SECRET,
    // Tempo de expiração do token JWT. Tipado como literal ("1d" as const) para evitar erros de sobrecarga no TypeScript.
    expiresIn: "1d" as const,
  },
};
