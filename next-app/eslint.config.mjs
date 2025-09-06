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
          pattern: ["src/core/**/*"],
        },
        {
          mode: "full",
          type: "shared",
          pattern: ["src/components/**/*"],
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
              from: "core",
              allow: ["core"],
            },
            {
              from: "shared",
              allow: ["core", "shared"],
            },
            {
              from: "feature",
              allow: ["core", "shared"],
            },
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
];

export default eslintConfig;
