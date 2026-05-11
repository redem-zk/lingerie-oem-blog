import { en } from '../i18n/en';
import { zh } from '../i18n/zh';

const translations = { en, zh };
type Locale = 'en' | 'zh';
type Translation = typeof en;

export function t(locale: string): Translation {
  return translations[locale as Locale] || translations.en;
}

export function getLangFromUrl(url: URL): 'en' | 'zh' {
  const [, lang] = url.pathname.split('/');
  if (lang === 'zh') return 'zh';
  return 'en';
}

export function localizedPath(locale: string, path: string): string {
  const cleanPath = path.replace(/^\/+/, '');
  if (cleanPath === '') return `/${locale}`;
  return `/${locale}/${cleanPath}`;
}
