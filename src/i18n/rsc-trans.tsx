import React from "react"

import { TransNoContext, TransProps } from '@lingui/react/server';
import { i18n } from "@lingui/core";

export function Trans(props: TransProps): React.ReactElement<any, any> | null {
  if (!i18n) {
    throw new Error('Lingui for RSC is not initialized. Use `setI18n()` first in root of your RSC tree.');
  }

  return <TransNoContext {...props} lingui={{ i18n }}/>
}
