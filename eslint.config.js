import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import configTypeScript from '@vue/eslint-config-typescript'
import configPrettier from '@vue/eslint-config-prettier'

export default [
  {
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/node_modules/**',
      '**/public/**',
      '**/.vite/**',
    ],
  },

  js.configs.recommended,

  ...pluginVue.configs['flat/essential'],

  ...configTypeScript({
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: import.meta.dirname,
    },
    rules: {
      // TypeScript 相关规则
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-const': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
    },
  }),

  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      // JavaScript 通用规则
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
      'prefer-const': 'error',
    },
  },

  {
    files: ['**/*.vue'],
    rules: {
      // Vue 相关规则
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'warn',
      'vue/require-default-prop': 'off',
      'vue/require-explicit-emits': 'off',
      'vue/require-prop-types': 'off',
      'vue/prefer-import-from-vue': 'off',
    },
  },

  configPrettier,
]
