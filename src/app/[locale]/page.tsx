import { Trans, t } from '@lingui/macro';
import Image from 'next/image';
import { LinguiProvider } from '../../i18n/lingui-provider';
import { ClientComponent } from './client-component';
import { Switcher } from './components/Switcher';
import styles from './page.module.css';
import { i18n } from '@lingui/core';

export default async function Home({ params }: { params: { locale: 'es' }}) {

  i18n.activate(params.locale)

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Trans>Plural Test: How many developers?</Trans>
        <div>
          <h2> `t` macro testing in RSC: </h2>
          {t`Hello`}
        </div>

        <LinguiProvider locale={params.locale}>
          <ClientComponent></ClientComponent>
          <Switcher></Switcher>
        </LinguiProvider>

      </div>
    </main>
  )
}
