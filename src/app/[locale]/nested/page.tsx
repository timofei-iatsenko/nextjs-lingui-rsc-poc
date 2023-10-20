import { Trans } from "@lingui/macro";
import { useLinguiSSR } from "@/i18n/i18n";
import Link from "next/link";

export default async function Nested({ params }) {
  // without this, the page crashes when navigating from the parent page (no full refresh)
  // uncomment it to make it work in all cases.
  //await useLinguiSSR(params.locale);

  return (
    <>
      <br />
      <Trans>Nested page</Trans>
      <br />
      <Link href={`/${params.locale}`}>
        <Trans>
          <b>Parent page</b>
        </Trans>
      </Link>
    </>
  );
}
