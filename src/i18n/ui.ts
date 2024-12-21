import tr from './tr.json';
import en from './en.json';

export const languages = {
  tr: 'Türkçe',
  en: 'English'
} as const;

export const defaultLang = 'tr';
export const showDefaultLang = false;

export const ui = {
  tr,
  en
} as const;

export type UiType = typeof ui;
export type Language = keyof typeof languages; 