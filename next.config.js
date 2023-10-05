const path = require('path');

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

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [
      ['@lingui/swc-plugin', {
        'runtimeModules': {
          'trans': [TRANS_VIRTUAL_MODULE_NAME, 'Trans'],
        },
      }],
    ],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /locales\/.*\.(json|po)$/,
      loader: '@lingui/loader',
    })


    config.resolve.plugins.push(new LinguiTransRscResolver());
    return config;
  },
}

module.exports = nextConfig
