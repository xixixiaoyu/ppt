<script setup lang="ts">
import {
  createPresentationContext,
  providePresentationContext,
} from '@/shared/presentation/presentation-context'
import { demoParticlesBackground } from '@/shared/backgrounds/modules/demo-particles'
import { softMeshBackground } from '@/shared/backgrounds/modules/soft-mesh'
import BackgroundManager from '@/shared/backgrounds/background-manager.vue'
import PptContainer from '@/shared/presentation/ppt-container.vue'

import Slide01Hero from './slide-01-hero.vue'
import Slide02Principles from './slide-02-principles.vue'
import Slide03Training from './slide-03-training.vue'
import Slide04ApiIntegration from './slide-04-api-integration.vue'
import Slide05ApiParameters from './slide-05-api-parameters.vue'
import Slide06Tokens from './slide-06-tokens.vue'
import Slide07PromptEngineering from './slide-07-prompt-engineering.vue'

const localeOptions = [
  { code: 'zh-Hans', label: 'Chinese', nativeLabel: '简体中文', direction: 'ltr' },
] as const

const presentationContext = createPresentationContext({
  defaults: {
    backgroundId: 'soft-mesh',
    locale: 'zh-Hans',
  },
  backgrounds: [demoParticlesBackground, softMeshBackground],
  locales: [...localeOptions],
  contextKey: 'acp-llm-tutorial',
  persist: true,
})

providePresentationContext(presentationContext)

const slides = [
  Slide01Hero,
  Slide02Principles,
  Slide03Training,
  Slide04ApiIntegration,
  Slide05ApiParameters,
  Slide06Tokens,
  Slide07PromptEngineering,
]
</script>

<template>
  <div
    class="relative flex h-screen w-screen overflow-hidden bg-surface text-text-primary"
    style="
      --surface: 248 250 252;
      --surface-muted: 241 245 249;
      --text-primary: 15 23 42;
      --text-muted: 71 85 105;
    "
  >
    <BackgroundManager />
    <main class="relative z-10 flex h-full w-full items-center justify-center px-6 py-6 sm:px-10">
      <div class="deck-shell h-full w-full">
        <ppt-container :slides="slides" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.deck-shell :deep(.ppt-container) {
  @apply bg-transparent;
}

.deck-shell :deep(.controls) {
  @apply fixed bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-text-primary shadow-xl shadow-black/40 backdrop-blur-xl;
}

.deck-shell :deep(.control-btn) {
  @apply flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-900 text-sm font-semibold shadow-md shadow-black/30 ring-1 ring-black/5 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 disabled:cursor-not-allowed disabled:opacity-40;
}

.deck-shell :deep(.slide-info) {
  @apply min-w-[56px] text-center text-xs font-semibold text-slate-900;
}

.deck-shell :deep(.progress-bar) {
  @apply fixed inset-x-0 bottom-0 h-[3px] bg-slate-900/30;
}

.deck-shell :deep(.progress) {
  @apply h-full bg-gradient-to-r from-accent to-accent transition-all duration-300;
}

.deck-shell :deep(pre) {
  scrollbar-width: thin;
  scrollbar-color: rgba(99, 102, 241, 0.6) rgba(148, 163, 184, 0.2);
}

.deck-shell :deep(pre)::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

.deck-shell :deep(pre)::-webkit-scrollbar-track {
  background: rgba(148, 163, 184, 0.25);
  border-radius: 9999px;
}

.deck-shell :deep(pre)::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, #6366f1 0%, #22d3ee 50%, #10b981 100%);
  border-radius: 9999px;
}

.deck-shell :deep(pre)::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(90deg, #4f46e5 0%, #06b6d4 50%, #059669 100%);
}
</style>
