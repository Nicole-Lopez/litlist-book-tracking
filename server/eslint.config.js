import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import graphqlPlugin from '@graphql-eslint/eslint-plugin'
import { defineConfig } from 'eslint/config'

export default defineConfig([
    {
        ignores: [
            'dist/**',
            'node_modules/**',
            'build/**',
            'pnpm-lock.yaml',
            'codegen.yml',
            '__genereted__/**',
        ],
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.node },
    },
    ...tseslint.configs.recommended,

    {
        rules: {
            '@typescript-eslint/consistent-type-definitions': 'off',
            '@typescript-eslint/explicit-function-return-type': [
                'error',
                { allowExpressions: true },
            ],
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        },
    },
    {
        files: ['**/*.graphql'],
        languageOptions: { parser: graphqlPlugin.parser },
        plugins: { '@graphql-eslint': graphqlPlugin },
    },

    prettierConfig,
])
