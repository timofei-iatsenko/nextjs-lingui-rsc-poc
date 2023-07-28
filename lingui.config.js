const nextConfig = require('./next.config')

/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ['en', 'es'],
  pseudoLocale: 'pseudo',
  sourceLocale: 'en',
  fallbackLocales: {
    default: 'en'
  },
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}',
      include: ['src/']
    }
  ]
}
