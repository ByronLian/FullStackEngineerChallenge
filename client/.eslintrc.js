module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  ignorePatterns: ['**/_tests/**/*.js'],
  extends: ['airbnb', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'import/prefer-default-export': 'off',
    semi: 0,
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'after-used',
      },
    ],
    'no-shadow': 0,
    'no-unused-expressions': 0,
    'no-useless-escape': 2,
    'react/no-array-index-key': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
}
