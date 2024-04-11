'use client'

import { setupI18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'

export type Props = {
  locale: string
  messages?: any
  children: React.ReactNode
}

export function LinguiProvider({ locale, messages, ...props }: Props) {
  return (
    <I18nProvider
      i18n={setupI18n({
        locale,
        messages: { [locale]: messages },
      })}
      {...props}
    />
  );
}
