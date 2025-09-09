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

// src/routes/deliveries-routes.ts
var deliveries_routes_exports = {};
__export(deliveries_routes_exports, {
  deliveriesRoutes: () => deliveriesRoutes
});
module.exports = __toCommonJS(deliveries_routes_exports);
var import_express = require("express");

// src/database/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  // Cria e exporta uma instância do PrismaClient com configuração de logs dependendo do ambiente
  log: process.env.NODE_ENV === "production" ? [] : ["query"]
  // Se NODE_ENV for 'production', não loga nada; caso contrário, loga as queries executadas
});

// src/controlles/deliveries-controller.ts
var import_zod = require("zod");
var DeliveriesController = class {
  // Método responsável por criar uma nova entrega
  async create(request, response) {
    const bodySchema = import_zod.z.object({
      user_id: import_zod.z.string().uuid(),
      description: import_zod.z.string()
    });
    const { user_id, description } = bodySchema.parse(request.body);
    await prisma.delivery.create({
      data: {
        userId: user_id,
        description
      }
    });
    return response.status(201).json();
  }
  // Método responsável por listar todas as entregas
  async index(request, response) {
    const deliveries = await prisma.delivery.findMany({
      include: {
        user: { select: { name: true, email: true } }
      }
    });
    return response.json(deliveries);
  }
};

// src/controlles/deliveries-status-controller.ts
var import_zod2 = require("zod");
var DeliveriesStatusController = class {
  // Método assíncrono para atualizar o status de uma entrega
  async update(request, response) {
    const paramsSchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid()
      // O parâmetro 'id' deve ser uma string no formato UUID
    });
    const bodySchema = import_zod2.z.object({
      status: import_zod2.z.enum(["processing", "shipped", "delivered"])
      // O status deve ser um dos valores permitidos
    });
    const { id } = paramsSchema.parse(request.params);
    const { status } = bodySchema.parse(request.body);
    await prisma.delivery.update({
      data: {
        status
        // Novo status da entrega
      },
      where: {
        id
        // ID da entrega a ser atualizada
      }
    });
    await prisma.deliveryLog.create({
      data: {
        deliveryId: id,
        description: status
      }
    });
    return response.json();
  }
};

// src/middlewares/ensure-authenticated.ts
var import_jsonwebtoken = require("jsonwebtoken");

// src/env.ts
var import_zod3 = require("zod");
var envSchema = import_zod3.z.object({
  DATABASE_URL: import_zod3.z.string().url(),
  // Espera que DATABASE_URL seja uma string no formato de URL
  JWT_SECRET: import_zod3.z.string(),
  // Espera que JWT_SECRET seja uma string qualquer
  PORT: import_zod3.z.coerce.number().default(3333)
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

// src/routes/deliveries-routes.ts
var deliveriesRoutes = (0, import_express.Router)();
var deliveriesController = new DeliveriesController();
var deliveriesStatusController = new DeliveriesStatusController();
deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]));
deliveriesRoutes.post("/", deliveriesController.create);
deliveriesRoutes.get("/", deliveriesController.index);
deliveriesRoutes.patch("/:id/status", deliveriesStatusController.update);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deliveriesRoutes
});
