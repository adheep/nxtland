import i18n from 'i18n-js'
import transformKeys from 'object-key-path-transformer'

import en from './languages/en.json'
import se from './languages/se.json'
import fr from './languages/fr.json'

export const lang = transformKeys(se)

export const setInitialLocale = () => {
  i18n.locale = localStorage.getItem("language");
}
i18n.defaultLocale = "en"
i18n.fallbacks = true
i18n.translations = { en, se, fr }

export default i18n
