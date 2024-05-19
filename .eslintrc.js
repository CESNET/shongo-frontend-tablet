module.exports = {
  root: true,
  ignorePatterns: ['index.ts', 'test.ts'],
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest'
      },
      extends: [
        'eslint:recommended',
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:rxjs/recommended'
      ],
      rules: {
        '@typescript-eslint/explicit-member-accessibility': [
          'warn',
          {
            accessibility: 'no-public'
          }
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            style: 'kebab-case'
          }
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            style: 'camelCase'
          }
        ],
        '@angular-eslint/no-host-metadata-property': 'off',
        'rxjs/no-implicit-any-catch': 'off',
        'no-implied-eval': 'error',
        'no-var': 'error',
        'consistent-return': 'error',
        'consistent-this': 'warn',
        'require-await': 'warn',
        eqeqeq: ['error', 'smart'],
        'array-callback-return': 'error',
        'no-else-return': [
          'warn',
          {
            allowElseIf: true
          }
        ],
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/unbound-method': [
          'warn',
          {
            ignoreStatic: true
          }
        ],
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-this-alias': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true
          }
        ],
        '@typescript-eslint/member-ordering': [
          'error',
          {
            default: [
              'signature',
              'call-signature',
              'public-decorated-field',
              'public-decorated-readonly-field',
              'protected-decorated-field',
              'protected-decorated-readonly-field',
              'private-decorated-field',
              'private-decorated-readonly-field',
              'public-static-field',
              'public-static-readonly-field',
              'protected-static-field',
              'protected-static-readonly-field',
              'private-static-field',
              'private-static-readonly-field',
              'public-abstract-field',
              'public-abstract-readonly-field',
              'protected-abstract-field',
              'protected-abstract-readonly-field',
              'public-instance-field',
              'public-instance-readonly-field',
              'protected-instance-field',
              'protected-instance-readonly-field',
              'private-instance-field',
              'private-instance-readonly-field',
              'static-initialization',
              'constructor',
              'public-decorated-get',
              'public-decorated-set',
              'protected-decorated-get',
              'protected-decorated-set',
              'private-decorated-get',
              'private-decorated-set',
              'public-static-get',
              'public-abstract-get',
              'public-instance-get',
              'public-static-set',
              'public-abstract-set',
              'public-instance-set',
              'protected-static-get',
              'protected-abstract-get',
              'protected-instance-get',
              'protected-static-set',
              'protected-abstract-set',
              'protected-instance-set',
              'private-static-get',
              'private-instance-get',
              'private-static-set',
              'private-instance-set',
              'public-static-method',
              'public-decorated-method',
              'public-abstract-method',
              'public-instance-method',
              'protected-static-method',
              'protected-decorated-method',
              'protected-abstract-method',
              'protected-instance-method',
              'private-static-method',
              'private-decorated-method',
              'private-instance-method'
            ]
          }
        ]
      }
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      plugins: ['html']
    }
  ]
};
