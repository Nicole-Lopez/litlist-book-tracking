const config = {
    overwrite: true,
    schema: './src/schema/schema.graphql',
    generates: {
        'src/generated/graphql.ts': {
            plugins: ['typescript', 'typescript-resolvers'],
            config: {
                constEnums: true,
                contextType: '../index.js#ContextServer',
                useTypeImports: true,
                typesPrefix: 'Gql',
            },
        },
    },
}
export default config
