import { Trans } from '@lingui/react/macro'
import { AboutText } from '../../components/AboutText'
import Developers from '../../components/Developers'
import { Switcher } from '../../components/Switcher'
import styles from '../../styles/Index.module.css'
import { ClientComponent } from './client-component';
import { setLocale } from '../../i18n';

type Params = {
  locale: string
}

type Props = {
  params: Params
}

export default function Page({ params }: Props) {
  setLocale(params.locale);

  return (
      <div className={styles.container}>
        <main className={styles.main}>
          <Switcher />
          <h1 className={styles.title}>
            <Trans>
              Welcome to <a href="https://nextjs.org">Next.js!</a>
            </Trans>
          </h1>
          <div className={styles.description}>
            <AboutText />
          </div>
          <Developers />

          <ClientComponent/>
        </main>
      </div>
  )
}

