"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/sessions-routes.ts
var sessions_routes_exports = {};
__export(sessions_routes_exports, {
  sessionsRoutes: () => sessionsRoutes
});
module.exports = __toCommonJS(sessions_routes_exports);
var import_express = require("express");

// src/utils/AppError.ts
var AppError = class {
  message;
  // Propriedade que armazena a mensagem de erro
  statusCode;
  // Propriedade que armazena o código de status HTTP associado ao erro
  // Criando um construtor que recebe mensagem e código de status (padrão 400)
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/env.ts
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  DATABASE_URL: import_zod.z.string().url(),
  // Espera que DATABASE_URL seja uma string no formato de URL
  JWT_SECRET: import_zod.z.string(),
  // Espera que JWT_SECRET seja uma string qualquer
  PORT: import_zod.z.coerce.number().default(3333)
  // Espera que PORT seja convertido para número, caso não esteja, e define 3333 como valor padrão
});
var env = envSchema.parse(process.env);

// src/configs/auth.ts
var authConfig = {
  // Configurações relacionadas ao JWT (JSON Web Token)
  jwt: {
    // Segredo utilizado para assinar e verificar o token JWT, obtido do arquivo env.ts centralizado e deve ser definido nas variáveis de ambiente
    secret: env.JWT_SECRET,
    // Define quanto tempo o token JWT será válido antes de expirar, neste caso 1 dia
    expiresIn: "1d"
  }
};

// src/database/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  // Cria e exporta uma instância do PrismaClient com configuração de logs dependendo do ambiente
  log: process.env.NODE_ENV === "production" ? [] : ["query"]
  // Se NODE_ENV for 'production', não loga nada; caso contrário, loga as queries executadas
});

// src/controlles/sessions-controller.ts
var import_jsonwebtoken = require("jsonwebtoken");
var import_bcrypt = require("bcrypt");
var import_zod2 = require("zod");
var SessionsController = class {
  // Método responsável por autenticar um usuário com email e senha
  async create(request, response) {
    const bodySchema = import_zod2.z.object({
      email: import_zod2.z.string().email(),
      password: import_zod2.z.string().min(6)
    });
    const { email, password } = bodySchema.parse(request.body);
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new AppError("Email ou senha inv\xE1lida!", 401);
    }
    const passwordMatched = await (0, import_bcrypt.compare)(password, user.password);
    if (!passwordMatched) {
      throw new AppError("Email ou senha inv\xE1lida!", 401);
    }
    const { secret, expiresIn } = authConfig.jwt;
    const token = (0, import_jsonwebtoken.sign)({ role: user.role ?? "customer" }, secret, {
      subject: user.id,
      expiresIn
    });
    const { password: hashedPassword, ...userWithoutPassword } = user;
    return response.json({ token, user: userWithoutPassword });
  }
};

// src/routes/sessions-routes.ts
var sessionsRoutes = (0, import_express.Router)();
var sessionsController = new SessionsController();
sessionsRoutes.post("/", sessionsController.create);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sessionsRoutes
});
