import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': false,
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'tt',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
];
// [ directives
//   'error',
//   {
//     type: 'attribute',
//     prefix: 'tt',
//     style: 'camelCase',
//   },
// ]
