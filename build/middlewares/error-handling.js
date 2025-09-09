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

// src/middlewares/error-handling.ts
var error_handling_exports = {};
__export(error_handling_exports, {
  errorHandling: () => errorHandling
});
module.exports = __toCommonJS(error_handling_exports);

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

// src/middlewares/error-handling.ts
var import_zod = require("zod");
function errorHandling(error, request, response, next) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }
  if (error instanceof import_zod.ZodError) {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  errorHandling
});
