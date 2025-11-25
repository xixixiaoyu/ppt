<script setup lang="ts">
import { ref } from 'vue'
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const tabs = [
  {
    id: 'indexing',
    label: '1. 建立索引 (Indexing)',
    content: [
      '文档解析：加载并解析文件',
      '文本分段：切分长文为块',
      '向量化：用 embedding 转为向量',
      '存储索引：写入向量库',
    ],
  },
  {
    id: 'retrieval',
    label: '2. 检索生成 (Retrieval & Generation)',
    content: [
      '问题向量化：将问题转换为向量',
      '相似度检索：在库中找最相似块',
      '构建提示词：组合问题与上下文',
      '生成答案：交给模型生成',
    ],
  },
  {
    id: 'generation',
    label: '3. 生成策略 (Answering)',
    content: [
      'Stuff：上下文直接拼接',
      'Refine：逐步细化',
      'Map-Reduce：分块回答再聚合',
      '引用与来源：附出处更可信',
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
        流程分为“建立索引”和“检索生成”两阶段。
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
