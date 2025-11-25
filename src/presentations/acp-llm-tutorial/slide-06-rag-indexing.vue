<script setup lang="ts">
import { computed } from 'vue'
import { highlight } from '../../utils/highlight'
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const code = `// 1. 加载文档
const documents = await new SimpleDirectoryReader().loadData({ directoryPath: './data' })

// 2. 定义 ServiceContext, 包含 Embedding 模型等
const serviceContext = serviceContextFromDefaults({
  embedModel: new DashScopeEmbedding(),
})

// 3. 构建并持久化索引
const index = await VectorStoreIndex.fromDocuments(documents, { serviceContext })
await index.storageContext.persist({ persistPath: './storage' })`

const interpretations = [
  {
    term: '加载文档 (Load)',
    description:
      '<code>SimpleDirectoryReader</code> 是一个文档加载器，LlamaIndex 内置了数十种加载器，可以从文件、Notion、Lark 等多种数据源加载数据。',
  },
  {
    term: '配置上下文 (ServiceContext)',
    description:
      '<code>serviceContext</code> 用于统一管理服务，如 Embedding 模型、LLM 等。这里我们使用通义千问的 Embedding 模型 <code>DashScopeEmbedding</code>。',
  },
  {
    term: '构建索引 (Index)',
    description:
      '<code>VectorStoreIndex</code> 是最常用的索引类型。调用 <code>fromDocuments</code> 时，LlamaIndex 会自动完成文本分块、调用 Embedding 模型、构建索引等一系列操作。',
  },
  {
    term: '持久化 (Persist)',
    description: '将构建好的索引保存到文件系统，避免每次重复构建，后续可直接加载复用。',
  },
]

const engineeringChoices = [
  {
    term: '模型选型：Embedding',
    description:
      '选择合适的 Embedding 模型至关重要。需要综合考虑模型的维度 (影响存储和计算成本)、在特定领域的表现以及调用成本。通常，针对特定领域 (如代码、金融) 微调的 Embedding 模型效果更佳。',
  },
  {
    term: '存储选型：向量数据库',
    description:
      '对于本地原型或小型项目，<code>Faiss</code> (通过 <code>faiss-node</code>) 是一个不错的选择。对于生产环境，应考虑使用专业的向量数据库，如 <code>Milvus</code>、<code>Zilliz Cloud</code> 或云厂商提供的服务 (如阿里云 AnalyticDB for PG)。',
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
          class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl p-5 shadow-xl"
        >
          <h3 class="font-bold text-slate-900">{{ i + 1 }}. {{ item.term }}</h3>
          <p class="mt-1 text-slate-700 text-sm" v-html="item.description"></p>
        </div>
        <div
          v-for="(item, i) in engineeringChoices"
          :key="i"
          class="bg-amber-400/10 backdrop-blur-md border border-amber-400/30 rounded-3xl p-5 shadow-xl ring-2 ring-amber-400/50"
        >
          <h3 class="font-bold text-amber-900">{{ item.term }}</h3>
          <p class="mt-1 text-amber-800 text-sm" v-html="item.description"></p>
        </div>
      </div>
    </div>
  </section>
</template>
