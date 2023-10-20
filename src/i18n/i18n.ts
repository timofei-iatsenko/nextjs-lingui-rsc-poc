import { cache } from 'react';
import { I18n, setupI18n } from '@lingui/core';
import { loadCatalog } from "@/i18n/utils";


export async function useLinguiSSR(locale?: string): Promise<I18n> {
  if (!getLocaleCtx().current && locale) {
    const catalog = await loadCatalog(locale);

    const i18n = setupI18n({
      locale,
      messages: { [locale]: catalog }
    });

    setI18n(i18n);
  }

  return getLocaleCtx().current as I18n;
}

export function setI18n(locale: I18n) {
  getLocaleCtx().current = locale;
}

export function getI18n(): I18n | undefined {
  return getLocaleCtx().current;
}

const getLocaleCtx = cache((): { current: I18n | undefined } => {
  return { current: undefined };
})
