import React from "react"

import { getI18n } from './locale';
import { TransNoContext, TransProps } from '@lingui/react/server';

export function Trans(props: TransProps): React.ReactElement<any, any> | null {
  const i18n = getI18n()

  if (!i18n) {
    throw new Error('Lingui for RSC is not initialized. Use `setI18n()` first in root of your RSC tree.');
  }

  return <TransNoContext {...props} lingui={{ i18n }}/>
}
