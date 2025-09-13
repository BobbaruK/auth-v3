import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import boundaries from "eslint-plugin-boundaries";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    plugins: {
      boundaries,
    },
    settings: {
      "boundaries/include": ["src/**/*"],
      "boundaries/elements": [
        {
          mode: "full",
          type: "core",
          capture: ["name"],
          pattern: ["src/core/**/*", "src/generated/**/*"],
        },
        {
          mode: "full",
          type: "shared",
          pattern: [
            "src/components/**/*",
            "src/constants/**/*",
            "src/lib/**/*",
            "src/providers/**/*",
            "src/types/**/*",
          ],
        },
        {
          mode: "full",
          type: "feature",
          capture: ["name"],
          pattern: ["src/features/*/**/*"],
        },
        {
          mode: "full",
          type: "app",
          capture: ["_", "fileName"],
          pattern: ["src/app/**/*"],
        },
        {
          mode: "full",
          type: "neverImport",
          pattern: ["src/*"],
        },
      ],
    },
    rules: {
      "boundaries/no-unknown": [2],
      "boundaries/no-unknown-files": [2],
      "boundaries/element-types": [
        2,
        {
          default: "disallow",
          rules: [
            {
              from: ["core", "shared", "feature"],
              allow: ["core", "shared"],
            },
            // {
            //   from: "shared",
            //   allow: ["core", "shared"],
            // },
            // {
            //   from: "feature",
            //   allow: ["core", "shared"],
            // },
            {
              from: ["app", "neverImport"],
              allow: ["core", "shared", "feature"],
            },
            {
              from: ["app"],
              allow: [["app", { fileName: "*.css" }]],
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/generated/**/*"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-unnecessary-type-constraint": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "@typescript-eslint/no-array-constructor": "off",
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-console": "off",
      "react/*": "off",
    },
  },
];

export default eslintConfig;
