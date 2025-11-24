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
</script>

<template>
  <section class="h-full w-full grid grid-rows-[auto_1fr] p-6 lg:p-10">
    <div class="flex-none">
      <h2 class="text-4xl font-extrabold">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-500">
          优化：检索后重排 (Re-ranking)
        </span>
      </h2>
      <p class="mt-2 text-slate-600 max-w-3xl">
        对初步检索结果进行“精加工”，去粗取精，提升最终答案的质量。
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start pt-6">
      <!-- Initial Retrieval -->
      <div class="bg-white/60 backdrop-blur-sm p-6 lg:p-8 border rounded-xl shadow-lg h-full">
        <h3 class="text-2xl font-bold text-slate-800 mb-4">
          1. 初步检索 (海选)
        </h3>
        <p class="text-sm text-slate-600 mb-4">
          向量数据库快速召回 Top-K 个语义相似的文档，速度快，但可能包含噪声。
        </p>
        <div class="space-y-2 text-sm">
          <div
            v-for="item in initialRetrieval"
            :key="item.doc"
            class="p-3 rounded-lg flex justify-between items-center transition-all"
            :class="[item.isNoise ? 'bg-rose-100/80 text-rose-700' : 'bg-slate-100/80 text-slate-800']"
          >
            <span>{{ item.doc }}</span>
            <span class="font-mono text-xs" :class="[item.isNoise ? 'font-semibold' : '']">相似度: {{ item.score }}</span>
          </div>
        </div>
      </div>

      <!-- Re-ranking -->
      <div class="bg-white/60 backdrop-blur-sm p-6 lg:p-8 border border-emerald-500/50 rounded-xl shadow-lg h-full">
        <h3 class="text-2xl font-bold text-emerald-700 mb-4">
          2. 精排 (复赛)
        </h3>
        <p class="text-sm text-slate-600 mb-4">
          Re-ranker 模型对初步结果进行二次打分，根据真实相关性重新排序。
        </p>
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
  </section>
</template>