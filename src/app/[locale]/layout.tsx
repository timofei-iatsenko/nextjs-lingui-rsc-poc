import { useLinguiSSR } from "@/i18n/i18n";
import { LinguiProvider } from "@/i18n/lingui-provider";
import { Trans } from "@lingui/macro";

export default async function LocaleLayout({
  params,
  children,
}: {
  params: any;
  children: React.ReactNode;
}) {
  const i18n = await useLinguiSSR(params.locale);

  return (
    <LinguiProvider locale={i18n.locale} messages={i18n.messages}>
      <Trans>Locale Layout</Trans>
      {children}
    </LinguiProvider>
  );
}
