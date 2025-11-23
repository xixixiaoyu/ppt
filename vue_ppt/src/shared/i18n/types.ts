export type LocaleCode = string & {}

export interface LocaleMeta {
  code: LocaleCode
  label: string
  nativeLabel: string
  direction?: 'ltr' | 'rtl'
}

export interface LocaleMessages {
  [key: string]: string | LocaleMessages
}

export type TranslationParams = Record<string, string | number>
