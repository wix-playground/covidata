declare module './messages_en.json' {
  export let strings: unknown;
}

export type TranslationKey = keyof typeof strings;
export function i18n(key: TranslationKey, params?: object): string;
export function getLocale(): string;
