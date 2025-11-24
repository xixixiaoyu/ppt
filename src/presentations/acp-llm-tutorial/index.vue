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
import Slide02Toc from './slide-02-toc.vue'
import Slide03Limitations from './slide-03-limitations.vue'
import Slide04RagSolution from './slide-04-rag-solution.vue'
import Slide05RagWorkflow from './slide-05-rag-workflow.vue'
import Slide06RagIndexing from './slide-06-rag-indexing.vue'
import Slide07RagRetrieval from './slide-07-rag-retrieval.vue'
import Slide08NewProblem from './slide-08-new-problem.vue'
import Slide09OptimizationTopk from './slide-09-optimization-topk.vue'
import Slide10OptimizationStructure from './slide-10-optimization-structure.vue'
import Slide11OptimizationChunking from './slide-11-optimization-chunking.vue'
import Slide12OptimizationQueryRewrite from './slide-12-optimization-query-rewrite.vue'
import Slide13OptimizationRerank from './slide-13-optimization-rerank.vue'
import Slide14AgentIntro from './slide-14-agent-intro.vue'
import Slide15AgentToolCalling from './slide-15-agent-tool-calling.vue'
import Slide16AgentValidation from './slide-16-agent-validation.vue'
import Slide17AgentFunctionCalling from './slide-17-agent-function-calling.vue'
import Slide18FineTuningIntro from './slide-18-fine-tuning-intro.vue'
import Slide19AutomatedEvaluationIntro from './slide-19-automated-evaluation-intro.vue'
import Slide20DeploymentOptions from './slide-20-deployment-options.vue'
import Slide21ProductionPractice from './slide-21-production-practice.vue'
import Slide22SecurityRisks from './slide-22-security-risks.vue'
import Slide23AiGuardrails from './slide-23-ai-guardrails.vue'
import Slide24SummaryAndOutlook from './slide-24-summary-and-outlook.vue'

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
  Slide02Toc,
  Slide03Limitations,
  Slide04RagSolution,
  Slide05RagWorkflow,
  Slide06RagIndexing,
  Slide07RagRetrieval,
  Slide08NewProblem,
  Slide09OptimizationTopk,
  Slide10OptimizationStructure,
  Slide11OptimizationChunking,
  Slide12OptimizationQueryRewrite,
  Slide13OptimizationRerank,
  Slide14AgentIntro,
  Slide15AgentToolCalling,
  Slide16AgentValidation,
  Slide17AgentFunctionCalling,
  Slide18FineTuningIntro,
  Slide19AutomatedEvaluationIntro,
  Slide20DeploymentOptions,
  Slide21ProductionPractice,
  Slide22SecurityRisks,
  Slide23AiGuardrails,
  Slide24SummaryAndOutlook,
]
</script>

<template>
  <div class="relative flex h-screen w-screen overflow-hidden bg-surface text-text-primary">
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
</style>
