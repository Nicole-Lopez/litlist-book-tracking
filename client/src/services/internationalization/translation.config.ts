import i18n from 'i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { SUPPORTED_LANGS, TRANSLATIONS_NS } from './locale.constants'

void i18n
	.use(HttpBackend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		load: 'languageOnly',
		detection: {
			order: ['localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
		},
		backend: {
			loadPath: '/translations/{{ns}}/{{lng}}.json',
		},
		supportedLngs: Object.values(SUPPORTED_LANGS),
		fallbackLng: SUPPORTED_LANGS.en,
		ns: Object.values(TRANSLATIONS_NS),
		defaultNS: TRANSLATIONS_NS.root,
		interpolation: {
			escapeValue: false,
		},
		debug: false,
	})

export default i18n
