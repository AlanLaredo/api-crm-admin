
import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './crm-schemas.gql',
  generates: {
    'graphql/types/types.ts': {
      plugins: ['typescript']
    },
    'graphql/codegenoperations/operations.ts': {
      plugins: ['typescript-operations']
    }
  }
}

export default config
