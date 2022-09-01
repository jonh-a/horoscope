module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    camelcase: 0,
    'no-console': 0,
    'import/extensions': [
      'warn',
      'ignorePackages',
      {
        js: 'always',
      },
    ],
  },
};
