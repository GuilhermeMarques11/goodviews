import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import tseslint from 'typescript-eslint';
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });
export default [
  js.configs.recommended,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  { ignores: ['node_modules', '.next', 'src/generated/**/*'] },
];
