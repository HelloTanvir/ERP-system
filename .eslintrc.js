module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 8,
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier', "react", "react-hooks"],
  extends: [
    "airbnb",
    "airbnb/hooks",
    "eslint:recommended",
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    "plugin:jsx-a11y/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    browser: true,
    es6: true,
  },
  ignorePatterns: ['.eslintrc.js', 'postcss.config.mjs', 'next.config.mjs'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'camelcase': 'off',
    'no-plusplus': 0,
    "import/prefer-default-export": 0,
    "import/extensions": 0,
    "import/order": 0,
    "react/react-in-jsx-scope": 0,
    "react-hooks/rules-of-hooks": "error",
    "no-console": 0,
    "no-return-assign": 0,
    "react/state-in-constructor": 0,
    "react/jsx-props-no-spreading": 0,
    "react/require-default-props": 0,
    "indent": 0,
    "linebreak-style": 0,
    "react/prop-types": 0,
    "no-param-reassign": 0,
    "no-underscore-dangle": 0,
    "no-undef": "error",
    "jsx-a11y/click-events-have-key-events": 0,
    "react/no-unescaped-entities": 0,
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    ],
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "es5",
        "singleQuote": true,
        "printWidth": 100,
        "tabWidth": 4,
        "semi": true,
        "endOfLine": "auto",
      }
    ]
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      },
      typescript: {}
    }
  },
};