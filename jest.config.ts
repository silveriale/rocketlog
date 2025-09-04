// Arquivo de configuração do Jest para execução de testes em um projeto TypeScript

import type { Config } from "jest";

// Cria o objeto de configuração do Jest tipado com Config
const config: Config = {
  bail: true, // Interrompe a execução dos testes no primeiro erro
  clearMocks: true, // Limpa automaticamente os mocks entre os testes
  coverageProvider: "v8", // Define o provedor de cobertura de código (engine V8)
  preset: "ts-jest", // Usa o preset ts-jest para rodar testes em TypeScript
  testEnvironment: "node", // Define o ambiente de teste como Node.js
  testMatch: ["<rootDir>/src/**/*.test.ts"], // Especifica o padrão dos arquivos de teste (todos arquivos .test.ts em src)
  moduleNameMapper: {  // Configura aliases de importação para facilitar resolução de paths
    "^@/(.*)$": "<rootDir>/src/$1", // Mapeia o alias @/ para a pasta src
  },
};

export default config;
