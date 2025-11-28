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
import Slide07bMultimodality from './slide-07b-multimodality.vue'
import Slide08CurrentApplications from './slide-08-current-applications.vue'
import Slide09FutureApplications from './slide-09-future-applications.vue'
import Slide10LimitationsAndSolutions from './slide-10-limitations-and-solutions.vue'
import Slide11RagWorkflow from './slide-11-rag-workflow.vue'
import Slide11bEmbeddingAndVectorDb from './slide-11b-embedding-and-vector-db.vue'
import Slide12LlamaIndexRag from './slide-12-llamaindex-rag.vue'
import Slide13RagOptimization from './slide-13-rag-optimization.vue'
import Slide14LlmTypesAndWorkflow from './slide-14-llm-types-and-workflow.vue'
import Slide15RagVsFineTuning from './slide-15-rag-vs-fine-tuning.vue'
import Slide16FineTuningDetails from './slide-16-fine-tuning-details.vue'
import Slide17TrainingEvaluation from './slide-17-training-evaluation.vue'
import Slide18RagEvaluationDimensions from './slide-18-rag-evaluation-dimensions.vue'
import Slide19Ragas from './slide-19-ragas.vue'
import Slide20RagAnswerQuality from './slide-20-rag-answer-quality.vue'
import SlideMergedTrustworthyEngineering from './slide-merged-trustworthy-engineering.vue'
import Slide22FunctionCallingAndMcp from './slide-22-function-calling-and-mcp.vue'
import Slide23AgentArchitecture from './slide-23-agent-architecture.vue'
import Slide24MultiAgentPatterns from './slide-24-multi-agent-patterns.vue'
import Slide25bModelSelectionStrategy from './slide-25b-model-selection-strategy.vue'
import Slide25DeploymentStrategies from './slide-25-deployment-strategies.vue'
import Slide26ProductionBestPractices from './slide-26-production-best-practices.vue'
import Slide27EdgeAndSmallModels from './slide-27-edge-and-small-models.vue'
import Slide29Summary from './slide-29-summary.vue'
import Slide30ThankYou from './slide-30-thank-you.vue'

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

// Reordered slides for better logical flow
const slides = [
  // Part 1: Fundamentals
  Slide01Hero,
  Slide02Principles,
  Slide06Tokens, // Moved here: Tokens are the atoms, understand them before workflow
  Slide14LlmTypesAndWorkflow, // Moved here: Workflow relies on understanding tokens
  Slide03Training,
  Slide10LimitationsAndSolutions, // Moved here: Transition from fundamentals to solutions

  // Part 2: Development & API
  Slide04ApiIntegration,
  Slide05ApiParameters,
  Slide07PromptEngineering,
  Slide07bMultimodality, // NEW: Beyond Text
  Slide22FunctionCallingAndMcp, // Moved here: Advanced dev capability

  // Part 3: RAG (Retrieval Augmented Generation)
  Slide11bEmbeddingAndVectorDb, // NEW: Foundation for RAG
  Slide11RagWorkflow,
  Slide12LlamaIndexRag,
  Slide13RagOptimization,
  Slide18RagEvaluationDimensions,
  Slide19Ragas,
  Slide20RagAnswerQuality,

  // Part 4: Fine-tuning
  Slide15RagVsFineTuning,
  Slide16FineTuningDetails,
  Slide17TrainingEvaluation,

  // Part 5: Agents
  Slide23AgentArchitecture,
  Slide24MultiAgentPatterns,

  // Part 6: Engineering & Production
  Slide25bModelSelectionStrategy, // NEW: Cost & Selection
  Slide25DeploymentStrategies,
  Slide27EdgeAndSmallModels,
  Slide26ProductionBestPractices,
  SlideMergedTrustworthyEngineering,

  // Part 7: Conclusion
  Slide08CurrentApplications,
  Slide09FutureApplications,
  Slide29Summary,
  Slide30ThankYou,
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
