<script setup lang="ts">
import { computed } from 'vue'
import { highlight } from '../../utils/highlight'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const code = `// 1. 加载索引
const storageContext = await storageContextFromDefaults({ persistPath: './storage' })
const index = await loadIndexFromStorage(storageContext)

// 2. 创建 Retriever, 负责召回
const retriever = index.asRetriever({ similarityTopK: 5 })

// 3. 创建 QueryEngine, 负责生成
const queryEngine = index.asQueryEngine({ retriever })

// 4. 执行查询
const { response, sourceNodes } = await queryEngine.query({ query: '项目管理用什么工具？' })
`

const highlightedCode = computed(() => highlight(code, 'typescript'))

const recall = [
  '<code>similarityTopK</code>: 控制召回文档的数量，是平衡效果与性能的关键参数。数量太少可能漏掉关键信息，太多则会增加噪声和LLM处理成本。',
  '<code>VectorIndexRetriever</code>: LlamaIndex 提供了多种 Retriever，例如可以结合元数据进行过滤，或者实现关键词 + 向量的混合检索。',
]

const rerank = [
  '<code>CohereRerank</code>: 在召回 (Recall) 之后，可以使用 Reranker 模型对结果进行重新排序，提高最相关文档的排名，从而提升最终生成答案的质量。',
  '<code>LLM Reranker</code>: 除了使用专门的 Reranker 模型，也可以利用 LLM 自身对召回的文档进行打分和排序，但需要注意成本和延迟。',
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
      <div class="flex flex-col justify-center gap-4 text-slate-700">
        <h2
          class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
        >
          RAG 实践：检索与生成
        </h2>
        <div class="flex flex-col gap-3 text-lg">
          <div
            class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-4"
          >
            <h3 class="font-bold text-slate-800">1. 加载索引</h3>
            <p class="text-slate-600 mt-1 text-sm">从持久化存储中快速恢复索引，无需重复构建。</p>
          </div>
          <div
            class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-4"
          >
            <h3 class="font-bold text-slate-800">2. 创建 Retriever (召回)</h3>
            <p class="text-slate-600 mt-1 text-sm leading-relaxed" v-html="recall[0]"></p>
            <p class="text-slate-600 mt-2 text-sm leading-relaxed" v-html="recall[1]"></p>
          </div>
          <div
            class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-4"
          >
            <h3 class="font-bold text-slate-800">3. 创建 QueryEngine (生成)</h3>
            <p class="text-slate-600 mt-1 text-sm">QueryEngine 封装了与 LLM 的交互，它接收 Retriever 召回的上下文和用户问题，然后调用 LLM 生成最终答案。</p>
          </div>
          <div
            class="bg-white/70 backdrop-blur-md border border-indigo-300/50 rounded-3xl shadow-xl p-4"
          >
            <h3 class="font-bold text-indigo-800">可选优化：Rerank (精排)</h3>
            <p class="text-indigo-600 mt-1 text-sm leading-relaxed" v-html="rerank[0]"></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
