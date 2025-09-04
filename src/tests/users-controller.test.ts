// Testes de integração do UsersController, validando a criação e limpeza de usuários no banco

import request from "supertest";
import { prisma } from "@/database/prisma";
import { app } from "@/app";

// Inicia um bloco de testes para o UsersController
describe("UsersController", () => {
  let user_id: string;

  // Remove o usuário de teste criado após a execução dos testes para não deixar resíduos no banco
  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id } });
  });
  // Define um caso de teste que valida a criação de um usuário com sucesso
  it("Deve criar um novo usuário com sucesso", async () => {
    // Envia uma requisição POST para a rota /users com os dados do usuário de teste
    const response = await request(app).post("/users").send({
      name: "Test User", // Define o nome do usuário de teste
      email: "testuser@example.com", // Define o email do usuário de teste
      password: "password123", // Define a senha do usuário de teste
    });

    expect(response.status).toBe(201); // Verifica se o status da resposta é 201 (Created)
    expect(response.body).toHaveProperty("id"); // Verifica se o corpo da resposta possui a propriedade "id"
    expect(response.body.name).toBe("Test User"); // Verifica se o nome retornado é igual ao enviado

    // Armazena o ID do usuário criado para ser usado posteriormente na limpeza
    user_id = response.body.id;
  });

  // Define um caso de teste que valida a falha ao tentar criar um usuário com email já existente
  it("Deve lançar um erro se o usuário com o mesmo email já existir", async () => {
    const response = await request(app).post("/users").send({
      name: "Duplicate User",
      email: "testuser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(400); // Verifica se o status da resposta é 400 (Bad Request)
    expect(response.body.message).toBe("Email já cadastrado por outro usuário!"); // Verifica se a mensagem de erro retornada corresponde ao esperado
    
  });
});
