'use client';

import { Trans, t } from '@lingui/macro';

export function ClientComponent() {
    return (
        <div>
            <h2> `t` macro testing in RCC: </h2>
            {t`Hello`} <br />
            <Trans>I'm Client Component</Trans>
        </div>

    )
}
