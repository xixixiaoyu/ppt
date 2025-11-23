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
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8 text-center">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400"
      >
        优化策略 (五)：检索后重排 (Re-ranking)
      </h2>
      <p class="mt-2 text-slate-600 max-w-2xl mx-auto">
        对初步检索结果进行“精加工”，去粗取精，提升最终答案的质量。
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Initial Retrieval -->
      <div class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-2xl p-6">
        <h3 class="text-xl font-bold text-slate-800 mb-3">1. 初步检索 (海选)</h3>
        <p class="text-sm text-slate-600 mb-4">
          向量数据库快速召回 Top-K 个语义相似的文档，速度快，但可能包含噪声。
        </p>
        <div class="space-y-2 text-sm">
          <div
            v-for="(item, i) in initialRetrieval"
            :key="i"
            class="p-3 rounded-lg flex justify-between items-center"
            :class="[item.isNoise ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-800']"
          >
            <span>{{ item.doc }}</span>
            <span :class="[item.isNoise ? 'font-semibold' : 'font-mono']"
              >相关度 {{ item.score }}</span
            >
          </div>
        </div>
      </div>

      <!-- Re-ranking -->
      <div
        class="relative rounded-2xl p-6 bg-white/70 backdrop-blur-md border border-transparent bg-clip-padding before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-gradient-to-r before:from-indigo-500 before:to-fuchsia-500"
      >
        <h3 class="text-xl font-bold text-slate-900 mb-3">2. 精排 (复赛)</h3>
        <p class="text-sm text-slate-700 mb-4">
          Re-ranker 模型对初步结果进行二次打分，根据真实相关性重新排序。
        </p>
        <div class="space-y-2 text-sm">
          <div
            v-for="(item, i) in reranked"
            :key="i"
            class="p-3 rounded-lg flex justify-between items-center"
            :class="[
              item.isKept
                ? 'bg-green-50 text-green-800 font-bold'
                : 'bg-slate-200 text-slate-500 line-through',
            ]"
          >
            <span>{{ item.doc }}</span>
            <span>真实相关度 {{ item.score }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 text-center">
      <p
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/40 backdrop-blur-md text-slate-700 text-sm"
      >
        💡 Re-ranking 是在“效率”与“效果”之间取得平衡的艺术：先快后精，确保最佳信息送达模型。
      </p>
    </div>
  </section>
</template>
