export async function loadCatalog(locale: string) {
  try {
  const catalog = await import(`@lingui/loader!../locales/${locale}.po`)
  return catalog.messages
  } catch (e) {
    console.error(`No catalog for locale "${locale}"`)
    return {};
  }
}
