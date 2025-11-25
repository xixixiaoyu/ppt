<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const initialRetrieval = [
  { doc: 'Doc A', score: 0.85, isNoise: false },
  { doc: 'Doc F', score: 0.82, isNoise: true },
  { doc: 'Doc B', score: 0.81, isNoise: false },
  { doc: 'Doc H', score: 0.79, isNoise: true },
  { doc: 'Doc C', score: 0.78, isNoise: false },
]

const reranked = [
  { doc: 'Doc B', score: 0.98, isKept: true },
  { doc: 'Doc A', score: 0.95, isKept: true },
  { doc: 'Doc C', score: 0.92, isKept: true },
  { doc: 'Doc F', score: 0.6, isKept: false },
  { doc: 'Doc H', score: 0.55, isKept: false },
]

const notes = [
  '<strong>Bi-encoder (双塔模型):</strong> 将问题和文档分开独立编码成向量，然后计算向量间的余弦相似度。此方式速度极快，适合在海量数据中做初步召回 (海选)。我们之前用的 Embedding 模型就属于此类。',
  '<strong>Cross-encoder (交互模型):</strong> 将问题和文档对拼接后，一同送入模型中进行打分，能捕捉更复杂的语义关系，精度更高，但计算量大，适合对少量候选文档进行精排 (复赛)。',
  '<strong>工程实践:</strong> 典型的“召回-排序” (Recall-Rank) 架构，即先用 Bi-encoder 从百万数据中快速召回 Top 100，再用 Cross-encoder 对这 100 个结果进行精准排序，取 Top 3-5。',
]

const code = `// 在 LlamaIndex 中使用 Reranker 非常简单
const nodePostprocessor = new CohereRerank({ topN: 5 });

const queryEngine = index.asQueryEngine({
  nodePostprocessors: [nodePostprocessor],
});`
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
      >
        优化：检索后重排 (Re-ranking)
      </h2>
      <p class="mt-2 text-slate-600 max-w-3xl">对初检结果精加工，去粗取精，提升答案质量。</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
      <!-- Initial Retrieval -->
      <div
        class="bg-white/70 backdrop-blur-md p-6 lg:p-8 border border-slate-200/30 rounded-3xl shadow-xl h-full transition hover:-translate-y-0.5"
      >
        <h3 class="text-2xl font-bold text-slate-800 mb-4">1. 初步检索 (海选)</h3>
        <p class="text-sm text-slate-600 mb-4">向量数据库快速召回 Top-K 相似文档，速度快但含噪。</p>
        <div class="space-y-2 text-sm">
          <div
            v-for="item in initialRetrieval"
            :key="item.doc"
            class="p-3 rounded-lg flex justify-between items-center transition-all"
            :class="[
              item.isNoise ? 'bg-rose-100/80 text-rose-700' : 'bg-slate-100/80 text-slate-800',
            ]"
          >
            <span>{{ item.doc }}</span>
            <span class="font-mono text-xs" :class="[item.isNoise ? 'font-semibold' : '']"
              >相似度: {{ item.score }}</span
            >
          </div>
        </div>
      </div>

      <!-- Re-ranking -->
      <div
        class="bg-white/70 backdrop-blur-md p-6 lg:p-8 border border-emerald-500/50 rounded-3xl shadow-xl h-full transition hover:-translate-y-0.5"
      >
        <h3 class="text-2xl font-bold text-emerald-700 mb-4">2. 精排 (复赛)</h3>
        <p class="text-sm text-slate-600 mb-4">Re-ranker 二次打分，按真实相关性排序。</p>
        <div class="space-y-2 text-sm">
          <div
            v-for="item in reranked"
            :key="item.doc"
            class="p-3 rounded-lg flex justify-between items-center transition-all"
            :class="[
              item.isKept
                ? 'bg-emerald-100/80 text-emerald-800 font-bold'
                : 'bg-slate-200/80 text-slate-500 line-through',
            ]"
          >
            <span>{{ item.doc }}</span>
            <span class="font-mono text-xs">相关度: {{ item.score }}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="mt-6 bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6"
    >
      <h3 class="text-xl font-bold text-slate-800 mb-3">模型选择建议</h3>
      <ul class="space-y-2 text-slate-700 text-sm">
        <li v-for="it in notes" :key="it" class="flex items-start gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="text-indigo-500"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span>{{ it }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
