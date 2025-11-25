<script setup lang="ts">
import { ref } from 'vue'
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const tabs = [
  {
    id: 'offline',
    label: '离线阶段：数据准备 (Offline)',
    content: [
      '数据提取：从不同数据源 (如 Confluence, Notion, GitHub) 提取文档',
      '文本解析与分块：加载文档并将其切割成更小、更易于检索的文本块 (Chunk)',
      '向量化 (Embedding)：调用模型将文本块转换为高维向量',
      '建立索引：将文本块及其向量存储到专门的向量数据库中',
    ],
  },
  {
    id: 'online',
    label: '在线阶段：检索与生成 (Online)',
    content: [
      '问题向量化：当用户提问时，同样调用 Embedding 模型将其转换为向量',
      '相似度检索：在向量数据库中执行相似度搜索，召回与问题最相关的 Top-K 个文本块',
      '构建上下文与提示词 (Prompt)：将召回的文本块与原始问题整合成一个丰富的 Prompt',
      '调用大模型生成答案：将构建好的 Prompt 发送给大模型，获取最终答案',
    ],
  },
]
const activeTab = ref('offline')
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
        流程分为“离线的数据准备”和“在线的检索生成”两个阶段。
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
