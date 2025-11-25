<script setup lang="ts">
import { computed } from 'vue'
import { highlight } from '../../utils/highlight'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const code = `const retriever = index.asRetriever({ \n  // 默认值为 2，我们将其增加到 5\n  similarityTopK: 5,\n})`

const highlightedCode = computed(() => highlight(code, 'typescript'))

const interpretations = [
  {
    term: '基本原理',
    description:
      '增加 <code>similarityTopK</code> 值，放宽召回阶段的阈值，从向量数据库中取回更多可能相关的文档片段，以提高找到正确答案所需信息的概率。',
  },
  {
    term: '适用场景',
    description: '当答案可能分散在多个文档片段中，或单个片段信息不足以回答问题时，此方法简单有效。',
  },
  {
    term: '权衡与取舍 (Trade-offs)',
    description:
      '更高的 Top-K 意味着更长的上下文，会增加 LLM 的处理负担和推理成本，并可能引入噪声，反而降低准确率。这是一个典型的“召回率 vs. 精度”的权衡。',
  },
]

const tips = [
  '<strong>实验与评估:</strong> Top-K 是一个超参数，最优值需要通过在验证集上进行实验来确定。可以从 3-5 开始尝试，观察其对最终答案质量和系统响应时间的影响。',
  '<strong>与 Rerank 结合:</strong> 一个常见的策略是设置一个相对较大的 Top-K (例如 10-20) 进行“粗召回”，然后使用一个轻量级的 Reranker 模型进行“精排”，筛选出最相关的 2-3 个文档。',
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="flex flex-col justify-center">
        <div
          class="bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 rounded-2xl text-slate-200 text-sm xl:text-base shadow-2xl shadow-slate-800/20"
        >
          <div class="flex items-center gap-2 px-4 py-3 border-b border-slate-700/80">
            <div class="w-3 h-3 rounded-full bg-red-500" />
            <div class="w-3 h-3 rounded-full bg-amber-500" />
            <div class="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <pre class="p-6 overflow-x-auto"><code class="font-mono" v-html="highlightedCode" /></pre>
        </div>
      </div>
      <div class="flex flex-col justify-center gap-6 text-slate-700">
        <h2
          class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
        >
          优化策略（一）：增加 Top-k
        </h2>
        <p class="text-lg text-slate-600">
          最直接的优化：调整检索数量，找到“数量”与“质量”的平衡点。
        </p>
        <div class="flex flex-col gap-4 text-lg">
          <div
            v-for="(item, i) in interpretations"
            :key="i"
            class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-5"
          >
            <h3 class="font-bold text-slate-800">{{ item.term }}</h3>
            <p class="text-slate-600 mt-1 text-base" v-html="item.description"></p>
          </div>
          <div
            class="bg-white/70 backdrop-blur-md border border-indigo-300/50 rounded-3xl shadow-xl p-5"
          >
            <h3 class="font-bold text-slate-800">实操建议</h3>
            <ul class="mt-2 space-y-2 text-slate-700 text-base">
              <li v-for="it in tips" :key="it" class="flex items-start gap-2">
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
                <span v-html="it"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
