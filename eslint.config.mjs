/**
 * THIS FILE WAS AUTO-GENERATED.
 * PLEASE DO NOT EDIT IT MANUALLY.
 * ===============================
 * IF YOU COPY THIS INTO AN ESLINT CONFIG, REMOVE THIS COMMENT BLOCK.
 */

import path from 'node:path'

import { includeIgnoreFile } from '@eslint/compat'
import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import { configs, plugins, rules } from 'eslint-config-airbnb-extended'
import { rules as prettierConfigRules } from 'eslint-config-prettier'
import eslintPluginBoundaries from 'eslint-plugin-boundaries'
import prettierPlugin from 'eslint-plugin-prettier'

const gitignorePath = path.resolve('.', '.gitignore')

const jsConfig = defineConfig([
  // ESLint recommended config
  {
    name: 'js/config',
    ...js.configs.recommended,
  },
  // Stylistic plugin
  plugins.stylistic,
  // Import X plugin
  plugins.importX,
  // Airbnb base recommended config
  ...configs.base.recommended,
  // Strict import rules
  rules.base.importsStrict,
])

const nodeConfig = defineConfig([
  // Node plugin
  plugins.node,
  // Airbnb Node recommended config
  ...configs.node.recommended,
])

const typescriptConfig = defineConfig([
  // TypeScript ESLint plugin
  plugins.typescriptEslint,
  // Airbnb base TypeScript config
  ...configs.base.typescript,
  // Strict TypeScript rules
  rules.typescript.typescriptEslintStrict,
])

const prettierConfig = defineConfig([
  // Prettier plugin
  {
    name: 'prettier/plugin/config',
    plugins: {
      prettier: prettierPlugin,
    },
  },
  // Prettier config
  {
    name: 'prettier/config',
    rules: {
      ...prettierConfigRules,
      'prettier/prettier': 'error',
    },
  },
])

export default defineConfig([
  // Ignore files and folders listed in .gitignore
  includeIgnoreFile(gitignorePath),
  // JavaScript config
  ...jsConfig,
  // Node config
  ...nodeConfig,
  // TypeScript config
  ...typescriptConfig,
  // Prettier config
  ...prettierConfig,
  {
    name: 'backend/custom-rules',
    plugins: {
      boundaries: eslintPluginBoundaries,
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
      'boundaries/elements': [
        {
          type: 'app',
          pattern: 'src/app/**/*',
        },
        {
          type: 'module',
          pattern: 'src/modules/*/**/*', // например: src/modules/user/components/...
          mode: 'folder', // помогает плагину понять, где корень элемента
        },
        {
          type: 'shared',
          pattern: 'src/shared/**/*',
        },
      ],
    },
    files: ['**/*.js', '**/*.ts'],
    rules: {
      'no-underscore-dangle': ['error', { allow: ['_id'] }],
      'import-x/extensions': [
        'error',
        'ignorePackages',
        { js: 'always', ts: 'never' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          rules: [
            // === СЛОЙ APP ===
            {
              from: { type: 'app' },
              allow: [
                { to: { type: 'app' } },
                { to: { type: 'module', internalPath: 'index.{ts,js}' } },
                { to: { type: 'infrastructure' } },
                { to: { type: 'shared' } },
              ],
            },

            // === СЛОЙ MODULE ===
            // 1. Разрешаем модулям импортировать файлы ИЗ СЕБЯ ЖЕ (произвольные файлы)
            {
              from: { type: 'module' },
              allow: [
                { to: { type: 'module' } }, // Временный оверрайд: ниже мы ограничим чужие модули
                { to: { type: 'infrastructure' } },
                { to: { type: 'shared' } },
              ],
            },
            // 2. А теперь ЗАПРЕЩАЕМ импорт из ЧУЖИХ модулей в обход index.ts
            {
              from: { type: 'module' },
              disallow: [
                {
                  to: {
                    type: 'module',
                    internalPath: '!index.{ts,js}', // Если путь НЕ index.ts — запрещено
                  },
                },
              ],
              // Важно: этот disallow сработает для межмодульных связей,
              // если у вас в settings правильно настроен mode: 'folder'
            },

            // === СЛОЙ INFRASTRUCTURE ===
            {
              from: { type: 'infrastructure' },
              allow: [
                { to: { type: 'infrastructure' } },
                { to: { type: 'shared' } },
              ],
            },

            // === СЛОЙ SHARED ===
            {
              from: { type: 'shared' },
              allow: [{ to: { type: 'shared' } }],
            },
          ],
        },
      ],
    },
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['vitest.config.ts'],
        },
      },
    },
  },
])
