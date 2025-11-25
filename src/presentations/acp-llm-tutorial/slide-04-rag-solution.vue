<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const items = [
  {
    name: '核心思想：开卷考试',
    recommended: false,
    description:
      '遇到未知问题，不让模型“回忆”，而是提供相关资料，基于资料回答。即上下文工程。',
  },
  {
    name: '技术实现：RAG',
    recommended: true,
    description:
      'RAG 是“开卷考试”的主流做法，结合外部知识库，动态供给模型所需信息。',
  },
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8 text-center">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
      >
        解决方案：检索增强生成
      </h2>
      <p class="mt-2 text-slate-600 max-w-2xl mx-auto">
        为大模型接上外部知识库，让它从“闭卷”走向“开卷”。
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <article
        v-for="(item, i) in items"
        :key="i"
        class="rounded-3xl border border-slate-200/30 bg-white/70 backdrop-blur-md p-6 md:p-8 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl h-full"
        :class="item.recommended ? 'ring-2 ring-accent/60 shadow-[0_10px_28px_rgba(var(--accent)/0.3)]' : ''"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-2xl font-bold text-slate-900">{{ item.name }}</h3>
          <span
            v-if="item.recommended"
            class="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent"
            >推荐方案</span
          >
        </div>
        <p class="mt-4 text-slate-700 text-base leading-relaxed">{{ item.description }}</p>
      </article>
    </div>
  </section>
</template>
