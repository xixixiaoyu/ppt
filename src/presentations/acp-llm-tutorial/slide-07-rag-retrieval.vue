<script setup lang="ts">
import { computed } from 'vue'
import { highlight } from '../../utils/highlight'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const code = `
// 1. 加载索引
const storageContext = await llamaindex.storageContextFromDefaults({
  persistPath: './knowledge_base/test'
})
const index = await llamaindex.VectorStoreIndex.init({ storageContext, embedModel })

// 2. 创建查询引擎
const queryEngine = index.asQueryEngine()

// 3. 执行查询
const { response, sourceNodes } = await queryEngine.query({
  query: '我们公司项目管理应该用什么工具？'
})
`

const highlightedCode = computed(() => highlight(code, 'typescript'))
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
          RAG：检索
        </h2>
        <div class="flex flex-col gap-4 text-lg">
          <div
            class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-5"
          >
            <h3 class="font-bold text-slate-800">1. 加载索引</h3>
            <p class="text-slate-600 mt-1">从持久化存储中加载之前创建的向量索引。</p>
          </div>
          <div
            class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-5"
          >
            <h3 class="font-bold text-slate-800">2. 创建查询引擎</h3>
            <p class="text-slate-600 mt-1">基于加载的索引，创建一个查询引擎实例。</p>
          </div>
          <div
            class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-5"
          >
            <h3 class="font-bold text-slate-800">3. 执行查询</h3>
            <p class="text-slate-600 mt-1">使用查询引擎执行自然语言查询。</p>
          </div>
          <div
            class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-5"
          >
            <h3 class="font-bold text-slate-800">4. 获取结果</h3>
            <p class="text-slate-600 mt-1">
              返回最相关的文档片段 (Source Nodes) 和生成的回答 (Response)。
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
