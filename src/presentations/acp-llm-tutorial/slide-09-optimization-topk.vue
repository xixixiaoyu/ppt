<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const code = `const queryEngine = index.asQueryEngine({
  // 默认值为 2，我们将其增加到 5
  similarity_top_k: 5,
})`

const interpretations = [
  {
    term: '核心思想',
    description: '扩大检索范围，一次性从知识库中找出更多可能相关的文档片段，提高命中正确信息的概率。'
  },
  {
    term: '优点',
    description: '实现极其简单，只需调整一个参数，就能在某些场景下立竿见-影地提升召回率。'
  },
  {
    term: '潜在问题',
    description: '引入更多信息的同时，也可能带来更多噪声。过多的无关信息会干扰大模型的判断，甚至超出其上下文长度限制，反而降低回答的准确性。'
  }
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8 text-center">
      <h2 class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400">
        优化策略 (一)：增加检索数量 (Top-k)
      </h2>
      <p class="mt-2 text-slate-600 max-w-2xl mx-auto">最简单直接的优化方法：让模型在回答前“多看几本书”。</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-slate-900/80 text-slate-100 rounded-2xl border border-white/10 p-6 font-mono text-sm leading-relaxed flex items-center justify-center">
        <pre><code>{{ code }}</code></pre>
      </div>
      <div class="space-y-4">
        <div v-for="(item, i) in interpretations" :key="i" class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-2xl p-5">
          <h3 class="font-bold text-slate-900">{{ item.term }}</h3>
          <p class="mt-1 text-slate-700 text-sm" v-html="item.description"></p>
        </div>
      </div>
    </div>
  </section>
</template>
