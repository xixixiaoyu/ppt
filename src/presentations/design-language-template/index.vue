<script setup lang="ts">
import { computed } from 'vue'

import BackgroundManager from '@/shared/backgrounds/background-manager.vue'
import { backgroundRegistry } from '@/shared/backgrounds/registry'
import {
  createPresentationContext,
  providePresentationContext,
} from '@/shared/presentation/presentation-context'

import PptContainer from '@/shared/presentation/ppt-container.vue'

import Slide1Hero from './slide-1-hero.vue'
import Slide2Spotlight from './slide-2-spotlight.vue'
import Slide3Outline from './slide-3-outline.vue'
import Slide4Stats from './slide-4-stats.vue'
import Slide6Tabs from './slide-5-tabs.vue'
import Slide7Compare from './slide-6-compare.vue'
import Slide8Checklist from './slide-7-checklist.vue'
import Slide9FAQ from './slide-8-faq.vue'
import Slide10CTA from './slide-9-cta.vue'
import Slide11Poll from './slide-10-poll.vue'
import Slide12Timeline from './slide-11-timeline.vue'
import Slide13Code from './slide-12-code.vue'
import Slide14Steps from './slide-13-steps.vue'
import Slide15BeforeAfter from './slide-14-before-after.vue'
import Slide16ChapterDivider from './slide-15-chapter-divider.vue'
import Slide17Team from './slide-16-team.vue'
import Slide18Quote from './slide-17-quote.vue'
import Slide19Media from './slide-18-media.vue'
import Slide20QAndA from './slide-19-q-and-a.vue'
import Slide21ThankYou from './slide-20-thank-you.vue'
import Slide22References from './slide-21-references.vue'
import Slide23Pricing from './slide-22-pricing.vue'
import Slide24Table from './slide-23-table.vue'
import Slide25LineChart from './slide-24-line-chart.vue'
import Slide26BarChart from './slide-25-bar-chart.vue'
import Slide27PieChart from './slide-26-pie-chart.vue'
import Slide28DonutChart from './slide-27-donut-chart.vue'
import Slide29ScatterChart from './slide-28-scatter-chart.vue'
import Slide30RadarChart from './slide-29-radar-chart.vue'

const localeOptions = [
  { code: 'zh-Hans', label: 'Chinese', nativeLabel: '简体中文', direction: 'ltr' },
] as const

const presentationContext = createPresentationContext({
  defaults: {
    backgroundId: 'soft-mesh',
    locale: 'zh-Hans',
  },
  backgrounds: backgroundRegistry,
  locales: [...localeOptions],
  contextKey: 'design-language-template',
  persist: true,
})

providePresentationContext(presentationContext)

const title = computed(() => '设计语言模板（示例）')

const slides = [
  Slide1Hero,
  Slide2Spotlight,
  Slide3Outline,
  Slide4Stats,
  Slide6Tabs,
  Slide7Compare,
  Slide8Checklist,
  Slide9FAQ,
  Slide12Timeline,
  Slide13Code,
  Slide14Steps,
  Slide15BeforeAfter,
  Slide16ChapterDivider,
  Slide17Team,
  Slide18Quote,
  Slide19Media,
  Slide11Poll,
  Slide20QAndA,
  Slide21ThankYou,
  Slide22References,
  Slide23Pricing,
  Slide24Table,
  Slide10CTA,
  Slide25LineChart,
  Slide26BarChart,
  Slide27PieChart,
  Slide28DonutChart,
  Slide29ScatterChart,
  Slide30RadarChart,
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
        <PptContainer :slides="slides" :title="title" thumbnails-label="幻灯片预览" />
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

.deck-shell :deep(.thumbnails) {
  @apply fixed right-5 top-1/2 flex max-h-[80vh] w-72 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-slate-900/90 shadow-2xl shadow-slate-900/40 backdrop-blur-xl;
}

.deck-shell :deep(.thumbnails-header) {
  @apply flex items-center justify-between border-b border-white/10 px-5 py-4 text-text-primary;
}

.deck-shell :deep(.thumbnails-header h3) {
  @apply m-0 text-base font-semibold text-text-primary;
}

.deck-shell :deep(.thumbnails-header button) {
  @apply flex h-6 w-6 items-center justify-center rounded-full text-base text-text-primary transition hover:bg-white/10;
}

.deck-shell :deep(.thumbnails-grid) {
  @apply max-h-[60vh] overflow-y-auto px-4 py-4;
}

.deck-shell :deep(.thumbnail) {
  @apply relative mb-3 h-28 w-full overflow-hidden rounded-lg bg-white/5 transition hover:scale-[1.02] hover:bg-white/10;
}

.deck-shell :deep(.thumbnail.active) {
  @apply border-2 border-accent bg-accent/20;
}

.deck-shell :deep(.thumbnail-number) {
  @apply absolute left-2 top-2 rounded-md bg-slate-900/80 px-2 py-1 text-xs font-semibold text-text-primary shadow-sm shadow-black/40;
}

@media (max-width: 768px) {
  .deck-shell :deep(.thumbnails) {
    @apply right-5 w-[calc(100vw-40px)];
  }

  .deck-shell :deep(.controls) {
    @apply gap-3 px-4 py-2;
  }

  .deck-shell :deep(.control-btn) {
    @apply h-10 w-10;
  }
}
</style>
