<script setup lang="ts">
import { computed } from 'vue'
import { highlight } from '../../utils/highlight'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const code = `const queryEngine = index.asQueryEngine({
  // 默认值为 2，我们将其增加到 5
  similarity_top_k: 5,
})`

const highlightedCode = computed(() => highlight(code, 'typescript'))

const interpretations = [
  {
    term: '核心思想',
    description: '扩大检索范围，一次性从知识库中找出更多可能相关的文档片段，提高命中正确信息的概率。'
  },
  {
    term: '优点',
    description: '实现极其简单，只需调整一个参数，就能在某些场景下立竿见影地提升召回率。'
  },
  {
    term: '潜在问题',
    description: '引入更多信息的同时，也可能带来更多噪声。过多的无关信息会干扰大模型的判断，甚至超出其上下文长度限制，反而降低回答的准确性。'
  }
]
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
        <pre
          class="p-6 overflow-x-auto"
        ><code class="font-mono" v-html="highlightedCode" /></pre>
      </div>
    </div>
    <div class="flex flex-col justify-center gap-6 text-slate-700">
      <h2 class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70">优化策略（一）：增加 Top-k</h2>
      <p class="text-lg text-slate-600">最简单直接的优化方法：让模型在回答前“多看几本书”。</p>
      <div class="flex flex-col gap-4 text-lg">
        <div v-for="(item, i) in interpretations" :key="i" class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-5">
          <h3 class="font-bold text-slate-800">{{ item.term }}</h3>
          <p class="text-slate-600 mt-1 text-base" v-html="item.description"></p>
        </div>
      </div>
    </div>
    </div>
  </section>
</template>
