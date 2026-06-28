import { loadEnv } from 'vite'
import type { CodegenConfig } from '@graphql-codegen/cli'

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '')

const config: CodegenConfig = {
    overwrite: true,
    schema: env.BOOKS_SERVER,
    documents: ['./src/**/*.graphql'],
    ignoreNoDocuments: true,
    generates: {
        './src/services/books/generated/graphql.generated.ts': {
            plugins: ['typescript-operations'],
            config: {
                generateOperationTypes: false,
                enumsAsConst: true,
                typesPrefix: 'Gql',
                useTypeImports: true,
            },
        },
        './src/': {
            preset: 'near-operation-file',
            plugins: ['typescript-operations', 'typed-document-node'],
            presetConfig: {
                baseTypesPath: '~@services/books/generated/graphql.generated.ts',
                folder: 'generated',
                extension: '.generated.ts',
            },
            config: {
                importSchemaTypesFrom: '~@services/books/generated/graphql.generated.ts',
                enumType: 'const',
                typesPrefix: 'Gql',
                useTypeImports: true,
                nonOptionalTypename: true,
                skipTypeNameForRoot: true,
            },
        },
    },
}

export default config
