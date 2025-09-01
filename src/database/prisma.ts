// Este arquivo inicializa e exporta uma instância única do Prisma Client, permitindo que a aplicação interaja com o banco de dados de forma tipada e segura.

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  // Cria e exporta uma instância do PrismaClient com configuração de logs dependendo do ambiente
  log: process.env.NODE_ENV === "production" ? [] : ["query"], // Se NODE_ENV for 'production', não loga nada; caso contrário, loga as queries executadas
});
