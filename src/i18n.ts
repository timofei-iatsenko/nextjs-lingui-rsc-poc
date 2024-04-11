import { setupI18n } from '@lingui/core';
import { messages as en } from './locales/en.po';
import { messages as es } from './locales/es.po';
import { messages as sr } from './locales/sr.po';
import { messages as pseudo } from './locales/pseudo.po';
import { setI18n } from '@lingui/react/server';

export async function loadCatalogAsync(locale: string) {
    const catalog = await import(`./locales/${locale}.po`)
    return catalog.messages
}

function loadCatalog(locale: string) {
    if (locale === 'es') {
        return es;
    }
    if (locale === 'sr') {
        return sr;
    }
    if (locale === 'pseudo') {
        return pseudo;
    }
    return en;
}

/**
 * This should be called on every page.
 * Initialize Lingui for Server Components
 * @param locale
 */
export function setLocale(locale: string) {
    const messages = loadCatalog(locale);

    const i18n = setupI18n({
        locale,
        messages: { [locale]: messages },
    })

    setI18n(i18n)

    return i18n;
}


