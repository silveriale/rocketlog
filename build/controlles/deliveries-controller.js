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

// src/controlles/deliveries-controller.ts
var deliveries_controller_exports = {};
__export(deliveries_controller_exports, {
  DeliveriesController: () => DeliveriesController
});
module.exports = __toCommonJS(deliveries_controller_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeliveriesController
});
