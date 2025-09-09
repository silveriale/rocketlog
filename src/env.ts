// Este arquivo é responsável por validar e garantir que as variáveis de ambiente necessárias estejam definidas e no formato correto antes de serem usadas na aplicação.

import { z } from "zod";

// Define um esquema de validação para as variáveis de ambiente esperadas
const envSchema = z.object({
  DATABASE_URL: z.string().url(), // Espera que DATABASE_URL seja uma string no formato de URL
  JWT_SECRET: z.string(), // Espera que JWT_SECRET seja uma string qualquer
  PORT: z.coerce.number().default(3333), // Espera que PORT seja convertido para número, caso não esteja, e define 3333 como valor padrão
});

// Valida as variáveis de ambiente do processo atual com base no esquema definido
export const env = envSchema.parse(process.env);
