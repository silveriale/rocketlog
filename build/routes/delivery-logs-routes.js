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

// src/routes/delivery-logs-routes.ts
var delivery_logs_routes_exports = {};
__export(delivery_logs_routes_exports, {
  deliveryLogsRoutes: () => deliveryLogsRoutes
});
module.exports = __toCommonJS(delivery_logs_routes_exports);
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

// src/database/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  // Cria e exporta uma instância do PrismaClient com configuração de logs dependendo do ambiente
  log: process.env.NODE_ENV === "production" ? [] : ["query"]
  // Se NODE_ENV for 'production', não loga nada; caso contrário, loga as queries executadas
});

// src/controlles/delivery-logs-controller.ts
var import_zod = require("zod");
var DeliveryLogsController = class {
  // Método assíncrono para criar um novo log de entrega
  async create(request, response) {
    const bodySchema = import_zod.z.object({
      delivery_id: import_zod.z.string().uuid(),
      description: import_zod.z.string()
    });
    const { delivery_id, description } = bodySchema.parse(request.body);
    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id }
    });
    if (!delivery) {
      throw new AppError("Entrega n\xE3o encontrada!", 404);
    }
    if (delivery.status === "delivered") {
      throw new AppError("Este pedido j\xE1 foi entregue!");
    }
    if (delivery.status === "processing") {
      throw new AppError("Mude o status para enviado (shipped)");
    }
    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description
      }
    });
    return response.status(201).json();
  }
  async show(request, response) {
    const paramsSchema = import_zod.z.object({
      delivery_id: import_zod.z.string().uuid()
    });
    const { delivery_id } = paramsSchema.parse(request.params);
    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
      include: {
        logs: true,
        user: true
      }
    });
    if (request.user?.role === "customer" && request.user.id !== delivery?.userId) {
      throw new AppError(
        "O usu\xE1rio s\xF3 pode visualizar seus pr\xF3prios pedidos!",
        401
      );
    }
    return response.json(delivery);
  }
};

// src/middlewares/ensure-authenticated.ts
var import_jsonwebtoken = require("jsonwebtoken");

// src/env.ts
var import_zod2 = require("zod");
var envSchema = import_zod2.z.object({
  DATABASE_URL: import_zod2.z.string().url(),
  // Espera que DATABASE_URL seja uma string no formato de URL
  JWT_SECRET: import_zod2.z.string(),
  // Espera que JWT_SECRET seja uma string qualquer
  PORT: import_zod2.z.coerce.number().default(3333)
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

// src/middlewares/ensure-authenticated.ts
function ensureAuthenticated(request, response, next) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new AppError("JWT token n\xE3o encontrado!");
    }
    const [, token] = authHeader.split(" ");
    const { role, sub: user_id } = (0, import_jsonwebtoken.verify)(
      token,
      authConfig.jwt.secret
    );
    request.user = {
      id: user_id,
      role
    };
    return next();
  } catch (error) {
    throw new AppError("JWT token inv\xE1lido!", 401);
  }
}

// src/middlewares/verify-user-authorization.ts
function verifyUserAuthorization(role) {
  return (request, response, next) => {
    if (!request.user) {
      throw new AppError("N\xE3o autorizado", 401);
    }
    if (!role.includes(request.user.role)) {
      throw new AppError("N\xE3o autorizado", 401);
    }
    return next();
  };
}

// src/routes/delivery-logs-routes.ts
var deliveryLogsRoutes = (0, import_express.Router)();
var deliveryLogsController = new DeliveryLogsController();
deliveryLogsRoutes.post(
  "/",
  // Caminho da rota
  ensureAuthenticated,
  // Middleware para garantir autenticação
  verifyUserAuthorization(["sale"]),
  // Middleware para garantir autorização de vendedor
  deliveryLogsController.create
  // Controller que lida com a criação do log
);
deliveryLogsRoutes.get(
  "/:delivery_id/show",
  // Caminho da rota com parâmetro delivery_id
  ensureAuthenticated,
  // Middleware para garantir autenticação
  verifyUserAuthorization(["sale", "customer"]),
  // Middleware que permite acesso a vendedores e clientes
  deliveryLogsController.show
  // Controller responsável por exibir os detalhes da entrega
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deliveryLogsRoutes
});
