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

// src/configs/auth.ts
var auth_exports = {};
__export(auth_exports, {
  authConfig: () => authConfig
});
module.exports = __toCommonJS(auth_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authConfig
});
