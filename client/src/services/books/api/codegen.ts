import { loadEnv } from 'vite'
import type { CodegenConfig } from '@graphql-codegen/cli'

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '')

const config: CodegenConfig = {
    overwrite: true,
    schema: env.BOOKS_SERVER,
    documents: ['./src/**/*.graphql'],
    ignoreNoDocuments: true,
    generates: {
        './src/services/books/api/generated/schema.generated.ts': {
            plugins: ['typescript-operations'],
            config: {
                enumType: 'const',
                generateOperationTypes: false,
                enumsAsConst: true,
                typesPrefix: 'Gql',
            },
        },
        './src/': {
            preset: 'near-operation-file',
            plugins: ['typescript-operations', 'typed-document-node'],
            presetConfig: {
                folder: 'generated',
                extension: '.generated.ts',
            },
            config: {
                importSchemaTypesFrom:
                    '~@services/books/api/generated/schema.generated.ts',
                useTypeImports: true,
                typesPrefix: 'Gql',
                nonOptionalTypename: true,
                skipTypeNameForRoot: true,
            },
        },
    },
}

export default config
