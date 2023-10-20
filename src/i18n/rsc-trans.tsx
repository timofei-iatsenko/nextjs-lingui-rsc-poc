import React from "react"

import { useLinguiSSR} from './i18n';
import { TransNoContext, TransProps } from '@lingui/react/server';



export async function Trans(props: TransProps): Promise<React.ReactElement<any, any> | null> {
  const i18n = await useLinguiSSR();

  if (!i18n) {
    throw new Error('Lingui for RSC is not initialized. Use `setI18n()` first in root of your RSC tree.');
  }

  return <TransNoContext {...props} lingui={{i18n}}/>
}
