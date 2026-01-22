import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import solid from "eslint-plugin-solid/configs/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "jsx-a11y": jsxA11y,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        console: "readonly",
        performance: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
        // Node.js globals
        module: "readonly",
        require: "readonly",
        process: "readonly",
      },
    },
    rules: {
      // Allow unused variables if prefixed with underscore
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],

      // Console statements - warn in development, error in production
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Best practices
      "no-debugger": "error",
      "no-alert": "warn",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "warn",
      "no-unused-expressions": "error",
      "no-duplicate-imports": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],

      // Code quality
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-empty-function": "warn",
      "no-lonely-if": "warn",
      "no-else-return": "warn",
      "prefer-template": "warn",
      "object-shorthand": ["warn", "always"],
      "no-useless-return": "warn",
      "no-useless-concat": "warn",
      curly: ["error", "multi-line"],

      // TypeScript specific
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports" },
      ],

      // Accessibility
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
    },
  },
  {
    // SolidJS specific config
    files: ["**/*.tsx"],
    ...solid,
  },
  {
    // Allow triple-slash references in Astro env.d.ts
    files: ["src/env.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
  {
    // Ignore patterns
    ignores: [
      "dist/**",
      "node_modules/**",
      ".astro/**",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
    ],
  },
];
