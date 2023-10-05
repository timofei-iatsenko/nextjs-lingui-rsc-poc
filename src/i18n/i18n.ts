import {  i18n } from '@lingui/core';


import { messages as en } from '@/locales/en.po'
import { messages as es } from '@/locales/es.po'

i18n.load({
  en,
  es
})

i18n.activate('en')
