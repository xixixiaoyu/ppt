<script setup lang="ts">
import { computed } from 'vue'
import { highlight } from '../../utils/highlight'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const beforeCode = `LlamaIndex 官方文档

简介
LlamaIndex 是一个...

核心概念
- Node: 数据单元
- Index: 节点集合`

const afterCode = `## LlamaIndex 官方文档

### 简介
LlamaIndex 是一个...

### 核心概念
- **Node**: 数据单元
- **Index**: 节点集合`

const highlightedAfterCode = computed(() => highlight(afterCode, 'markdown'))

const interpretations = [
  {
    term: '明确层次',
    description:
      'Markdown 的标题 (<code>#</code>, <code>##</code>) 帮助模型区分章节和段落，理解内容的主次关系。',
  },
  {
    term: '突出重点',
    description: '粗体、斜体和列表等元素能让模型注意到关键术语和并列关系。',
  },
  {
    term: '提升精度',
    description:
      '模型在生成答案时，可以更准确地引用到具体的章节标题，使答案来源更清晰，减少“捏造”事实的可能性。',
  },
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="text-center mb-8">
      <h2 class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70">优化策略（二）：优化文档结构</h2>
      <p class="mt-2 text-slate-600 max-w-2xl mx-auto">
        为非结构化文本添加 Markdown 格式，提升模型对关键信息的理解能力。
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Before -->
      <div
        class="bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 rounded-2xl text-slate-200 text-sm shadow-2xl"
      >
        <div class="flex items-center justify-between px-4 py-2 border-b border-slate-700/80">
          <h3 class="font-bold text-slate-300">Before: 原始数据</h3>
          <span
            class="inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold bg-slate-700 text-slate-300"
            >待优化</span
          >
        </div>
        <pre class="p-4 overflow-x-auto"><code class="font-mono">{{ beforeCode }}</code></pre>
      </div>

      <!-- After -->
      <div
        class="bg-slate-800/80 backdrop-blur-sm border border-emerald-700/80 rounded-2xl text-slate-200 text-sm shadow-2xl"
      >
        <div class="flex items-center justify-between px-4 py-2 border-b border-emerald-700/80">
          <h3 class="font-bold text-emerald-300">After: 结构化后</h3>
          <span
            class="inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold bg-emerald-900/50 text-emerald-300"
            >效果显著</span
          >
        </div>
        <pre
          class="p-4 overflow-x-auto"
        ><code class="font-mono" v-html="highlightedAfterCode" /></pre>
      </div>
    </div>

    <div class="mt-6 bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6">
      <h3 class="font-bold text-slate-800 text-xl mb-3">解读：结构即上下文</h3>
      <div class="flex flex-col gap-2">
        <div v-for="(item, i) in interpretations" :key="i">
          <h4 class="font-semibold text-slate-700">{{ item.term }}</h4>
          <p class="text-slate-600 text-sm" v-html="item.description" />
        </div>
      </div>
    </div>
  </section>
</template>
