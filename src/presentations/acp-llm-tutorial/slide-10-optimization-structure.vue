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
    term: '为什么结构很重要？',
    description:
      'LLM 在其训练数据中见过大量 Markdown、代码等结构化文本。提供结构化的输入，相当于使用了模型最“熟悉”的语言，能有效激活其对层次、重点和逻辑关系的理解能力。'
  },
  {
    term: '如何实现结构化？',
    description:
      '<strong>Markdown 是基础:</strong> 在数据清洗阶段，尽可能将纯文本转换为带有标题、列表、粗体等标记的 Markdown 格式。<br><strong>元数据是关键:</strong> 将文档的标题、作者、日期等元数据与内容一同组织成结构化格式 (如 JSON)，这对于后续实现更精准的元数据过滤至关重要。'
  },
  {
    term: '对下游任务的影响',
    description:
      '高质量的结构化数据不仅能提升答案的准确性，还有助于模型生成更清晰、更具逻辑性的回答，并能更容易地实现精确到章节级别的引用追溯。'
  }
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="text-center mb-8">
      <h2 class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70">优化策略（二）：优化文档结构</h2>
      <p class="mt-2 text-slate-600 max-w-2xl mx-auto">
        好的结构是高质量上下文的基础。让模型更好地“阅读”你的文档。
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
