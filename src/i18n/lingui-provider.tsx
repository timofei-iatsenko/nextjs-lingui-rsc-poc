
'use client';
import '@/i18n/i18n'

import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { useEffect, type PropsWithChildren } from 'react';

export function LinguiProvider({children, locale}: PropsWithChildren<{ locale: string }>) {

  i18n.activate(locale)

  return  (
    <I18nProvider  i18n={i18n}>
      {children}
    </I18nProvider>
  )
}
