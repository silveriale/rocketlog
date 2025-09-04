// Testes de integração do SessionsController: autenticação de usuários e geração de token

import request from "supertest";
import { prisma } from "@/database/prisma";
import { app } from "@/app";

// Inicia um bloco de testes para o SessionsController
describe("SessionsControler", () => {
  // Declara uma variável para armazenar o ID do usuário criado durante o teste
  let user_id: string;

  // Remove o usuário de teste criado após a execução dos testes para não deixar resíduos no banco
  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id } });
  });

  // Define um caso de teste que valida a autenticação e o retorno de um token de acesso
  it("Deve autenticar e obter token de acesso", async () => {
    // Cria um novo usuário de teste enviando uma requisição POST para /users
    const userResponse = await request(app).post("/users").send({
      name: "Auth Test User", // Nome do usuário de teste
      email: "auth-test-user@example.com", // Email do usuário de teste
      password: "password123", // Senha do usuário de teste
    });

    user_id = userResponse.body.id; // Armazena o ID do usuário criado para permitir exclusão no afterAll

    // Realiza o login do usuário criado enviando email e senha para a rota /sessions
    const sessionResponse = await request(app).post("/sessions").send({
      email: "auth-test-user@example.com", // Email do usuário de teste utilizado para autenticação
      password: "password123", // Senha do usuário de teste utilizada para autenticação
    });

    expect(sessionResponse.status).toBe(200); // Verifica se a resposta tem status 200 (OK)
    expect(sessionResponse.body.token).toEqual(expect.any(String)); // Verifica se o corpo da resposta contém um token válido do tipo string
  });
});
