import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import jestPlugin from 'eslint-plugin-jest-dom'
import testingLibrary from 'eslint-plugin-testing-library'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, prettierConfig],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      prettier: prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'lf',
        },
      ],
      'linebreak-style': ['error', 'unix'],
    },
  },

  {
    files: [
      '**/*.test.{ts,tsx}',
      '**/__tests__/**/*.{ts,tsx}',
      '**/__mocks__/**/*.{ts,tsx}',
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
    plugins: {
      'jest-dom': jestPlugin,
      'testing-library': testingLibrary,
    },
    extends: [jestPlugin.configs.recommended, testingLibrary.configs.react],
    rules: {
      'testing-library/no-node-access': 'warn',
      'testing-library/no-container': 'warn',
      'testing-library/no-debugging-utils': 'warn',
      'jest-dom/prefer-checked': 'error',
      'jest-dom/prefer-empty': 'error',
      'jest-dom/prefer-enabled-disabled': 'error',
      'jest-dom/prefer-focus': 'error',
      'jest-dom/prefer-in-document': 'error',
      'jest-dom/prefer-to-have-attribute': 'error',
    },
  },
)
