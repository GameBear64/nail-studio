import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends('eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:tailwindcss/recommended'),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-prop-types': 'off',
      'vue/valid-v-for': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'vue/no-unused-vars': [
        0,
        {
          ignorePattern: '^_',
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],

      'no-cond-assign': 2,
      'no-console': 1,
      'no-debugger': 2,
      'no-dupe-args': 2,
      'no-dupe-keys': 2,
      'no-empty': 2,
      'no-ex-assign': 2,
      'no-extra-parens': 0,
      'no-extra-semi': 2,
      'no-invalid-regexp': 2,
      'no-control-regex': 0,
      'no-irregular-whitespace': 2,
      'no-negated-in-lhs': 2,
      'no-unreachable': 2,
      'valid-typeof': 2,
      'no-eval': 2,
      'no-extra-bind': 2,
      'no-fallthrough': 2,
      'no-floating-decimal': 2,
      'no-implied-eval': 2,
      'no-iterator': 2,
      'no-labels': 2,
      'no-lone-blocks': 2,
      'no-multi-spaces': 2,
      'no-proto': 2,
      'no-redeclare': 2,
      'no-return-assign': 2,
      'no-script-url': 2,
      'no-self-compare': 2,
      'no-sequences': 2,
      'no-unused-expressions': 2,
      'no-void': 2,
      'vars-on-top': 2,
      'wrap-iife': 2,
      yoda: 2,

      'no-unused-vars': [
        1,
        {
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.js', '**/*.vue'],

    rules: {
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // `vue` first then packages starting with a character
            ['^vue$', '^[a-z]'],
            // Packages starting with `@`
            ['^@'],
            // My custom aliases
            ['^@components'],
            ['^@form'],
            ['^@tools', '^@store'],
            // Imports starting with `../`
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Imports starting with `./`
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ],
        },
      ],
    },
  },
];
