import { createContext, useContext } from 'react'

export type Lang = 'en' | 'pt'

export interface Messages {
  hero: {
    label: string
    title: string
    body: string
    cta: string
    ghost: string
  }
  panels: {
    gallery: { label: string; title: string }
    days: { label: string; title: string }
    countdown: { label: string; title: string }
    manifest: { label: string; title: string }
  }
  days: {
    unit: string
    since: string
    hours: string
    minutes: string
    seconds: string
  }
  countdown: {
    days: string
    hours: string
    minutes: string
    seconds: string
    target: string
    elapsed: (p: number) => string
    milestoneMark: string
    milestoneNote: string
  }
  carousel: {
    region: string
    prev: string
    next: string
    choose: string
    photo: string
  }
  manifest: {
    prose: string
    node: string
  }
  footer: string
  langToggle: {
    label: string
    en: string
    pt: string
  }
}

export const en: Messages = {
  hero: {
    label: 'A tribute to Giulia',
    title: 'Giulia',
    body: 'Every day with you is a page worth keeping. This little corner of the internet holds the story of us — measured in days, hours, and every moment still to come. It is my small way of caring, to show you how much I love you.',
    cta: 'View our moments',
    ghost: 'Open the gallery',
  },
  panels: {
    gallery: { label: 'ARCHIVE / MOMENTS', title: 'Our moments' },
    days: { label: 'TELEMETRY / US', title: 'Days together' },
    countdown: { label: 'COUNTDOWN / TWO YEARS', title: 'Two years together' },
    manifest: { label: 'NOTE / FOR YOU', title: 'For you' },
  },
  days: {
    unit: 'days',
    since: 'since 28.10.2024',
    hours: 'hours',
    minutes: 'minutes',
    seconds: 'seconds',
  },
  countdown: {
    days: 'days',
    hours: 'hours',
    minutes: 'minutes',
    seconds: 'seconds',
    target: 'target · 28.10.2026',
    elapsed: (p: number) => `${p}% of the way`,
    milestoneMark: '2 years',
    milestoneNote: 'together — and every day still new.',
  },
  carousel: {
    region: 'Photo archive of Giulia',
    prev: 'Previous photo',
    next: 'Next photo',
    choose: 'Choose photo',
    photo: 'Photo',
  },
  manifest: {
    prose: 'Built for you, to remind you how much you are loved. Every second here is a little proof of us — quiet, steady, and kept.',
    node: 'NODE 01 · FOR GIULIA',
  },
  footer: 'Made with love, for Giulia.',
  langToggle: {
    label: 'Switch language',
    en: 'English',
    pt: 'Português (Brasil)',
  },
}

export const pt: Messages = {
  hero: {
    label: 'Uma homenagem à Giulia',
    title: 'Giulia',
    body: 'Cada dia com você é uma página que vale guardar. Este cantinho da internet guarda a nossa história — medida em dias, horas e em cada momento que ainda está por vir. É a minha pequena forma de carinho, para demonstrar o quanto eu te amo.',
    cta: 'Ver nossos momentos',
    ghost: 'Abrir a galeria',
  },
  panels: {
    gallery: { label: 'ARQUIVO / MOMENTOS', title: 'Nossos momentos' },
    days: { label: 'TELEMETRIA / NÓS', title: 'Dias juntos' },
    countdown: { label: 'CONTAGEM / DOIS ANOS', title: 'Dois anos juntos' },
    manifest: { label: 'NOTA / PARA VOCÊ', title: 'Para você' },
  },
  days: {
    unit: 'dias',
    since: 'desde 28.10.2024',
    hours: 'horas',
    minutes: 'minutos',
    seconds: 'segundos',
  },
  countdown: {
    days: 'dias',
    hours: 'horas',
    minutes: 'minutos',
    seconds: 'segundos',
    target: 'alvo · 28.10.2026',
    elapsed: (p: number) => `${p}% do caminho`,
    milestoneMark: '2 anos',
    milestoneNote: 'juntos — e cada dia ainda é novo.',
  },
  carousel: {
    region: 'Arquivo de fotos da Giulia',
    prev: 'Foto anterior',
    next: 'Próxima foto',
    choose: 'Escolher foto',
    photo: 'Foto',
  },
  manifest: {
    prose: 'Feito para você, para lembrar o quanto você é amada. Cada segundo aqui é uma pequena prova de nós — silenciosa, constante e guardada.',
    node: 'ARQUIVO 01 · PARA GIULIA',
  },
  footer: 'Feito com amor, para a Giulia.',
  langToggle: {
    label: 'Trocar idioma',
    en: 'Inglês',
    pt: 'Português (Brasil)',
  },
}

export const translations: Record<Lang, Messages> = { en, pt }

export const STORAGE_KEY = 'giulia-lang'

export interface I18nContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Messages
}

export const I18nContext = createContext<I18nContextValue | null>(null)

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}