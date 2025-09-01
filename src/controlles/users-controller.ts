// Este arquivo contém o controller responsável por lidar com requisições relacionadas a usuários.

import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { hash } from "bcrypt";
import { z } from "zod";

// Classe responsável por controlar ações relacionadas a usuários, incluindo criação.
class UsersController {
  // Método que valida os dados, verifica duplicidade de email, gera hash da senha, cria o usuário no banco e retorna os dados sem a senha.
  async create(request: Request, response: Response) {
    // Schema de validação do corpo da requisição usando zod, garantindo formato e regras para os campos.
    const bodySchema = z.object({
      name: z.string().trim().min(2),
      email: z.string().email(),
      password: z.string().min(6),
    });

    // Valida o corpo da requisição e extrai as variáveis name, email e password.
    const { name, email, password } = bodySchema.parse(request.body);

    // Verifica se o email já está em uso por outro usuário.
    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });

    // Caso um usuário com o mesmo email tenha sido encontrado, interrompe o fluxo de criação.
    if (userWithSameEmail) {
      // Lança um AppError; o middleware global de erros captura essa exceção e responde com a mensagem adequada ao cliente.
      throw new AppError("Email já cadastrado por outro usuário!");
    }

    // Gera uma senha criptografada com fator de custo 8.
    const hashedPassword = await hash(password, 8);

    // Cria o usuário no banco de dados com os dados validados e a senha já criptografada.
    const user = await prisma.user.create({
      data: {
        name,               // Nome do usuário (string validada pelo Zod)
        email,              // Email único do usuário (string validada pelo Zod)
        password: hashedPassword, // Hash da senha gerado pelo bcrypt com salt 8
      },
    });

    // Remove o campo `password` do objeto retornado pelo Prisma, mantendo o restante em `userWithoutPassword`.
    const { password: _, ...userWithoutPassword } = user;

    // Retorna 200 (padrão) com o usuário criado SEM o campo de senha.
    return response.json(userWithoutPassword);
  }
}

export { UsersController };
