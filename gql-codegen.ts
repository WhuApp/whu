
import type { CodegenConfig } from '@graphql-codegen/cli';
import { addTypenameSelectionDocumentTransform } from '@graphql-codegen/client-preset'

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api.whu.app/graphql",
  documents: "src/**/*.tsx",
  generates: {
    "src/gql/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: 'getFragmentData' }
      },
      plugins: [],
      documentTransforms: [addTypenameSelectionDocumentTransform]
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
