module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["standard", "eslint-config-prettier", "plugin: prettier / recommended"], 
  "parser": "@babel/eslint-parser",	
  "prettierIntegration": true,
  "overrides": [
    {
      "files": [".eslintrc.{js,cjs}"],
      "env": {
        "node": true
      },
      "parserOptions": {
        "sourceType": "script"
      },
      "rules": {
        "no-console": "off"
      },
      "plugins": ["prettier"],
      "extends": ["plugin:prettier/recommended", "prettier"]
    }
  ],
  "parserOptions": {
    "ecmaVersion": 2021, 
    "sourceType": "module"
  },
  "rules": {
    "prettier/prettier": "error",
    "arrow-parens": [
      "error",
      "always"
    ],
    "tabWidth": 2,
    "semi": [
      "error",
      "always"
    ],
    "no-console": 0,
    "indent": [
      "error",
      2
    ]},
  "plugins": ["prettier"],
};
