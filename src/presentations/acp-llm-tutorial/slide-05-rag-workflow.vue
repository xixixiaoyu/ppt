<script setup lang="ts">
import { ref } from 'vue'
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const tabs = [
  {
    id: 'indexing',
    label: '1. 建立索引 (Indexing)',
    content: [
      '文档解析：加载并解析知识库文件。',
      '文本分段：将长文本切分为小块 (Chunks)。',
      '文本向量化：使用 Embedding 模型将文本块转换为向量。',
      '存储索引：将向量存入专门的向量数据库。',
    ],
  },
  {
    id: 'retrieval',
    label: '2. 检索生成 (Retrieval & Generation)',
    content: [
      '问题向量化：将用户问题同样转换为向量。',
      '相似度检索：在向量数据库中，搜索与问题向量最相似的文本块。',
      '构建提示词：将问题和检索到的文本块组合成一个丰富的提示词。',
      '生成答案：将提示词交给大模型，生成最终答案。',
    ],
  },
]
const activeTab = ref('indexing')
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8 text-center">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
      >
        RAG 的工作流程
      </h2>
      <p class="mt-2 text-slate-600 max-w-2xl mx-auto">
        RAG 的工作流程分为“建立索引”和“检索生成”两个核心阶段。
      </p>
    </div>

    <div class="flex flex-wrap items-center justify-center gap-2">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/40 backdrop-blur-md shadow-sm text-slate-800 transition hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
        :class="{ '!bg-white/90 ring-2 ring-accent/60': activeTab === tab.id }"
      >
        {{ tab.label }}
      </button>
    </div>

    <div
      class="mt-6 rounded-3xl border border-slate-200/30 bg-white/70 backdrop-blur-md shadow-xl p-6 md:p-8 min-h-[240px] transition hover:-translate-y-0.5"
    >
      <ul class="space-y-3 text-slate-700 text-lg">
        <li
          v-for="(item, index) in tabs.find((t) => t.id === activeTab)?.content"
          :key="index"
          class="flex items-start gap-3"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            class="text-emerald-500/80 shrink-0 mt-1.5"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
