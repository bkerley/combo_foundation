// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { 
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_' 
        }
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // Semicolon rules
      'semi': ['error', 'never'],                    // Require semicolons
      'no-extra-semi': 'error',                       // Disallow redundant semicolons
    },
  }
)