"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/app.ts
var app_exports = {};
__export(app_exports, {
  app: () => app
});
module.exports = __toCommonJS(app_exports);
var import_express6 = __toESM(require("express"));
var import_express_async_errors = require("express-async-errors");

// src/routes/index.ts
var import_express5 = require("express");

// src/routes/users-routes.ts
var import_express = require("express");

// src/database/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  // Cria e exporta uma instância do PrismaClient com configuração de logs dependendo do ambiente
  log: process.env.NODE_ENV === "production" ? [] : ["query"]
  // Se NODE_ENV for 'production', não loga nada; caso contrário, loga as queries executadas
});

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

// src/controlles/users-controller.ts
var import_bcrypt = require("bcrypt");
var import_zod = require("zod");
var UsersController = class {
  // Método que valida os dados, verifica duplicidade de email, gera hash da senha, cria o usuário no banco e retorna os dados sem a senha.
  async create(request, response) {
    const bodySchema = import_zod.z.object({
      name: import_zod.z.string().trim().min(2),
      email: import_zod.z.string().email(),
      password: import_zod.z.string().min(6)
    });
    const { name, email, password } = bodySchema.parse(request.body);
    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });
    if (userWithSameEmail) {
      throw new AppError("Email j\xE1 cadastrado por outro usu\xE1rio!");
    }
    const hashedPassword = await (0, import_bcrypt.hash)(password, 8);
    const user = await prisma.user.create({
      data: {
        name,
        // Nome do usuário (string validada pelo Zod)
        email,
        // Email único do usuário (string validada pelo Zod)
        password: hashedPassword
        // Hash da senha gerado pelo bcrypt com salt 8
      }
    });
    const { password: _, ...userWithoutPassword } = user;
    return response.status(201).json(userWithoutPassword);
  }
};

// src/routes/users-routes.ts
var usersRoutes = (0, import_express.Router)();
var usersController = new UsersController();
usersRoutes.post("/", usersController.create);

// src/routes/sessions-routes.ts
var import_express2 = require("express");

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

// src/controlles/sessions-controller.ts
var import_jsonwebtoken = require("jsonwebtoken");
var import_bcrypt2 = require("bcrypt");
var import_zod3 = require("zod");
var SessionsController = class {
  // Método responsável por autenticar um usuário com email e senha
  async create(request, response) {
    const bodySchema = import_zod3.z.object({
      email: import_zod3.z.string().email(),
      password: import_zod3.z.string().min(6)
    });
    const { email, password } = bodySchema.parse(request.body);
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new AppError("Email ou senha inv\xE1lida!", 401);
    }
    const passwordMatched = await (0, import_bcrypt2.compare)(password, user.password);
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
var sessionsRoutes = (0, import_express2.Router)();
var sessionsController = new SessionsController();
sessionsRoutes.post("/", sessionsController.create);

// src/routes/deliveries-routes.ts
var import_express3 = require("express");

// src/controlles/deliveries-controller.ts
var import_zod4 = require("zod");
var DeliveriesController = class {
  // Método responsável por criar uma nova entrega
  async create(request, response) {
    const bodySchema = import_zod4.z.object({
      user_id: import_zod4.z.string().uuid(),
      description: import_zod4.z.string()
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
var import_zod5 = require("zod");
var DeliveriesStatusController = class {
  // Método assíncrono para atualizar o status de uma entrega
  async update(request, response) {
    const paramsSchema = import_zod5.z.object({
      id: import_zod5.z.string().uuid()
      // O parâmetro 'id' deve ser uma string no formato UUID
    });
    const bodySchema = import_zod5.z.object({
      status: import_zod5.z.enum(["processing", "shipped", "delivered"])
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
var import_jsonwebtoken2 = require("jsonwebtoken");
function ensureAuthenticated(request, response, next) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new AppError("JWT token n\xE3o encontrado!");
    }
    const [, token] = authHeader.split(" ");
    const { role, sub: user_id } = (0, import_jsonwebtoken2.verify)(
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
var deliveriesRoutes = (0, import_express3.Router)();
var deliveriesController = new DeliveriesController();
var deliveriesStatusController = new DeliveriesStatusController();
deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]));
deliveriesRoutes.post("/", deliveriesController.create);
deliveriesRoutes.get("/", deliveriesController.index);
deliveriesRoutes.patch("/:id/status", deliveriesStatusController.update);

// src/routes/delivery-logs-routes.ts
var import_express4 = require("express");

// src/controlles/delivery-logs-controller.ts
var import_zod6 = require("zod");
var DeliveryLogsController = class {
  // Método assíncrono para criar um novo log de entrega
  async create(request, response) {
    const bodySchema = import_zod6.z.object({
      delivery_id: import_zod6.z.string().uuid(),
      description: import_zod6.z.string()
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
    const paramsSchema = import_zod6.z.object({
      delivery_id: import_zod6.z.string().uuid()
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

// src/routes/delivery-logs-routes.ts
var deliveryLogsRoutes = (0, import_express4.Router)();
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

// src/routes/index.ts
var routes = (0, import_express5.Router)();
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/deliveries", deliveriesRoutes);
routes.use("/delivery-logs", deliveryLogsRoutes);

// src/middlewares/error-handling.ts
var import_zod7 = require("zod");
function errorHandling(error, request, response, next) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }
  if (error instanceof import_zod7.ZodError) {
    return response.status(400).json({
      // Retorna resposta com status 400 (erro de validação)
      message: "validation error",
      // Define a mensagem de erro como "validation error"
      issues: error.format()
      // Retorna os detalhes formatados dos erros de validação do Zod
    });
  }
  return response.status(500).json({ message: error.message });
}

// src/app.ts
var app = (0, import_express6.default)();
app.use(import_express6.default.json());
app.use(routes);
app.use(errorHandling);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
