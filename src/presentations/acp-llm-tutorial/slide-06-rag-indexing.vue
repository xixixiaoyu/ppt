<script setup lang="ts">
import { computed } from 'vue'
import { highlight } from '../../utils/highlight'
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const code = `// 1. 加载文档
const documents = await new SimpleDirectoryReader().loadData({ directoryPath: './knowledge_base/test' })

// 2. 定义 Embedding 模型
const embedModel = new llamaindex.DashScopeEmbedding({
  model: llamaindex.DashScopeTextEmbeddingModels.TEXT_EMBEDDING_V2
})

// 3. 构建索引
const index = await llamaindex.VectorStoreIndex.fromDocuments(documents, { embedModel })

// 4. 持久化存储
await index.storageContext.persist({ persistPath: './knowledge_base/test' })`

const interpretations = [
  {
    term: '加载文档',
    description: '使用 <code>SimpleDirectoryReader</code> 从指定目录加载所有文档，这是知识的源头。',
  },
  {
    term: '定义模型',
    description: '实例化通义千问的 <code>DashScopeEmbedding</code> 模型，用于将文本转换为向量。',
  },
  {
    term: '构建索引',
    description:
      '调用 <code>VectorStoreIndex.fromDocuments</code>，这是最核心的一步。它在内部完成了“文本分块”和“向量化”，然后将生成的向量存储在内存中。',
  },
  {
    term: '持久化',
    description: '将内存中的索引保存到文件系统，以便后续直接加载，避免重复构建，提高效率。',
  },
]

const highlightedCode = computed(() => highlight(code, 'typescript'))
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8 text-center">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
      >
        RAG 实践：建立索引
      </h2>
      <p class="mt-2 text-slate-600 max-w-2xl mx-auto">
        将非结构化的文档转化为机器可理解的向量索引。
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        class="bg-slate-900/80 text-slate-100 rounded-2xl border border-white/10 p-6 font-mono text-sm leading-relaxed shadow-2xl"
      >
        <pre
          class="whitespace-pre-wrap break-words"
        ><code class="whitespace-pre-wrap break-words" v-html="highlightedCode" /></pre>
      </div>
      <div class="space-y-4">
        <div
          v-for="(item, i) in interpretations"
          :key="i"
          class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl p-5 h-full shadow-xl"
        >
          <h3 class="font-bold text-slate-900">{{ i + 1 }}. {{ item.term }}</h3>
          <p class="mt-1 text-slate-700 text-sm" v-html="item.description"></p>
        </div>
      </div>
    </div>
  </section>
</template>
