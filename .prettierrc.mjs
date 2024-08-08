import { fileURLToPath } from 'node:url';

/**
 * Some of Prettier's defaults can be overridden by an EditorConfig file. We
 * define those here to ensure that doesn't happen.
 *
 * See: https://github.com/prettier/prettier/blob/main/docs/configuration.md#editorconfig
 * @type {import('prettier').Config}
 */

/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = Object.assign(
  {},
  { endOfLine: 'lf', tabWidth: 2, printWidth: 80, useTabs: false },
  {
    semi: true,
    singleQuote: true,
    htmlWhitespaceSensitivity: 'ignore',
    trailingComma: 'all',
    plugins: [
      'prettier-plugin-packagejson',
      '@ianvs/prettier-plugin-sort-imports',
      'prettier-plugin-tailwindcss',
    ],
    tailwindConfig: fileURLToPath(
      new URL('./tailwind.config.ts', import.meta.url),
    ),
    tailwindFunctions: ['cn', 'cva'],
    importOrder: [
      '<TYPES>',
      '^(react/(.*)$)|^(react$)|^(react-native(.*)$)',
      '^(@remix-run(.*)$)|^(@remix-run$)',
      '^(remix(.*)$)|^(remix$)',
      '<THIRD_PARTY_MODULES>',
      '',
      '',
      '<TYPES>^[.|..|~]',
      '^~/',
      '^[../]',
      '^[./]',
    ],
    importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
    importOrderTypeScriptVersion: '4.4.0',
  },
);

export default config;
