import { isBrowser } from "~/libs/browser-utils";

export type SettingName =
  | "disableBeforeInput"
  | "measureTypingPerf"
  | "isRichText"
  | "isCharLimit"
  | "isMaxLength"
  | "isCharLimitUtf8"
  | "isAutocomplete"
  | "showTreeView"
  | "showNestedEditorTreeView"
  | "emptyEditor"
  | "showTableOfContents";

export type Settings = Record<SettingName, boolean>;

const hostName = isBrowser ? window.location.hostname : null;

export const isDevPlayground: boolean =
  hostName !== "playground.lexical.dev" &&
  hostName !== "lexical-playground.vercel.app";

export const DEFAULT_SETTINGS: Settings = {
  disableBeforeInput: false,
  emptyEditor: isDevPlayground,
  isAutocomplete: false,
  isCharLimit: false,
  isCharLimitUtf8: false,
  isMaxLength: false,
  isRichText: true,
  measureTypingPerf: false,
  showNestedEditorTreeView: false,
  showTableOfContents: false,
  showTreeView: false,
};
