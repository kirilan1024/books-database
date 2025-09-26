// ESLint configuration for ESLint v9+
// See: https://eslint.org/docs/latest/use/configure/migration-guide

/** @type {import('eslint').Linter.Config} */
export default {
  files: ["**/*.js"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      window: true,
      document: true,
      NodeJS: true,
      jest: true,
      module: true,
      require: true,
      process: true
    }
  },
  // 'extends' is not supported in flat config. Use recommended config directly if needed.
  rules: {
    // Add or override rules here
  },
};
