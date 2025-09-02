// Este arquivo é responsável por validar e garantir que as variáveis de ambiente necessárias estejam definidas e no formato correto antes de serem usadas na aplicação.

import { z } from "zod";

// Define um esquema de validação para as variáveis de ambiente esperadas
const envSchema = z.object({
  // Espera que DATABASE_URL seja uma string no formato de URL
  DATABASE_URL: z.string().url(),
  // Espera que JWT_SECRET seja uma string qualquer
  JWT_SECRET: z.string(),
});

// Valida as variáveis de ambiente do processo atual com base no esquema definido
export const env = envSchema.parse(process.env);


