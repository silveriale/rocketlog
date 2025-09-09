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

// src/middlewares/verify-user-authorization.ts
var verify_user_authorization_exports = {};
__export(verify_user_authorization_exports, {
  verifyUserAuthorization: () => verifyUserAuthorization
});
module.exports = __toCommonJS(verify_user_authorization_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  verifyUserAuthorization
});
