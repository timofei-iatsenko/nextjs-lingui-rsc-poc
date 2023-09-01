This is working PoC of [Lingui](https://lingui.dev) with [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) in NextJS 

## How it works

There are few key moments making this work:

1. I was able to "simulate" context feature in RSC with `React.cache` function. Having that, we can use `<Trans>` in any place in RSC tree without prop drilling.

```ts
// /src/i18n/i18n.ts
import { cache } from 'react';
import type { I18n } from '@lingui/core';

export function setI18n(i18n: I18n) {
  getLinguiCtx().current = i18n;
}

export function getI18n(): I18n | undefined {
  return getLinguiCtx().current;
}

const getLinguiCtx = cache((): {current: I18n | undefined} => {
  return {current: undefined};
})
```

Then we need to setup Lingui for RSC in page component:
```ts
// /src/app/[locale]/page.tsx
export default async function Home({ params }) {
  const catalog = await loadCatalog(params.locale);

  const i18n = setupI18n({
    locale: params.locale,
    messages: { [params.locale]: catalog },
  });

  setI18n(
    i18n,
  );
}
```
And then in any RSC:
```ts
const i18n = getI18n()
```

2. Withing this being in place, we have to create a separate version of `<Trans>` which is using `getI18n()` instead of `useContext()`. 
   
   Lingui since version `4.4.1` exposing separate endpoint `@lingui/react/server` with a
   `<TransNoContext>` component which is not using Context feature. 
   Our new component is a wrapper around that version.

3. Having this is already enough, you can use RSC version in the server components and regular version in client. But that is not really great DX, we can automatically detect RSC components and swap implementation thanks to webpack magic. This is done by:
    - macro configured to insert `import {Trans} from 'virtual-lingui-trans'`
    - webpack has a custom resolve plugin which depending on the resolver context will resolve the virtual name to RSC or Regular version.

```js
const TRANS_VIRTUAL_MODULE_NAME = 'virtual-lingui-trans';

class LinguiTransRscResolver {
  apply(resolver) {
    const target = resolver.ensureHook('resolve');
    resolver
      .getHook('resolve')
      .tapAsync('LinguiTransRscResolver', (request, resolveContext, callback) => {

        if (request.request === TRANS_VIRTUAL_MODULE_NAME) {
          const req = {
            ...request,
            // nextjs putting  `issuerLayer: 'rsc' | 'ssr'` into the context of resolver. 
            // We can use it for our purpose:
            request: request.context.issuerLayer === 'rsc'
              // RSC Version without Context
              ? path.resolve('./src/i18n/rsc-trans.tsx')
              // Regular version
              : '@lingui/react',
          };

          return resolver.doResolve(target, req, null, resolveContext, callback);
        }

        callback();
      });
  }
}
```
Implementation consideration:

- Webpack magic uses undocumented feature of NextJS (`issuerLayer: 'rsc' | 'ssr'`), that might break at any moment without semver bumping. 
- Detecting language and routing is up to user implementation. This repo uses segment based i18n by creating `/src/app/[locale]` folder. I think it's out of the Lingui scope.
- We still need to configure separately Lingui for RSC and client components. It seems it's a restriction of RSC design which is not avoidable. So you have to use I18nProvider in every root with client components. (or do everything as RSC)


Any feedback or suggestions are welcome here https://github.com/lingui/js-lingui/issues/1698

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000/en/](http://localhost:3000/en/) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
