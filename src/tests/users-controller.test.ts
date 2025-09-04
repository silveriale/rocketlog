// Arquivo de testes de integração para o UsersController, validando a criação de usuários via rota /users

import request from "supertest";
import { app } from "@/app";
// Inicia um bloco de testes para o UsersController
describe("UsersController", () => {
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
  });
});
