// .eslintrc.js
export default {
  root: true,
  extends: [
    'next/core-web-vitals', // regras recomendadas pelo Next.js
    'next', // suporte a Next.js + TypeScript
  ],
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'src/generated/', // Prisma / código gerado
    '**/prisma/generated/', // Prisma / código gerado
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Regras customizadas
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
