import { t } from '@lingui/core/macro';
import { Inter } from 'next/font/google';
import '../../styles/globals.css';
import { getI18n } from '@lingui/react/server';
import { LinguiProvider } from '../../components/LinguiProvider';

type Params = {
  locale: string
}

type Props = {
  params: Params
  children: React.ReactNode
}

const inter = Inter({ subsets: ["latin"] })

export function generateMetadata() {
  const i18n = getI18n()!

  return {
    title: t(i18n)`Translation Demo`,
  }
}

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'sr' },
    { locale: 'es' },
    { locale: 'pseudo'}
  ]
}

export default function RootLayout({ params, children }: Props) {
  const i18n = getI18n()

  return (
    <html lang={params.locale}>
      <body className={inter.className}>
      <LinguiProvider locale={i18n!.locale} messages={i18n!.messages}>
          {children}
      </LinguiProvider>
      </body>
    </html>
  );
}
