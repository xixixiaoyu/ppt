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
    description: '扩大检索范围，一次找出更多可能相关片段，提高命中率。'
  },
  {
    term: '优点',
    description: '实现简单，只调一个参数，常见场景立竿见影。'
  },
  {
    term: '潜在问题',
    description: '信息更多也会带来噪声，干扰判断，甚至超出上下文长度，降低准确性。'
  }
]

const tips = [
  '从 3–10 起步，结合评测数据选择最优值',
  '与重排结合，先广召回再精筛选',
  '关注上下文长度与成本，避免无意义扩充'
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
      <p class="text-lg text-slate-600">简单直接：回答前多看几本书。</p>
        <div class="flex flex-col gap-4 text-lg">
          <div v-for="(item, i) in interpretations" :key="i" class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-5">
            <h3 class="font-bold text-slate-800">{{ item.term }}</h3>
            <p class="text-slate-600 mt-1 text-base" v-html="item.description"></p>
          </div>
          <div class="bg-white/70 backdrop-blur-md border border-indigo-300/50 rounded-3xl shadow-xl p-5">
            <h3 class="font-bold text-slate-800">实操建议</h3>
            <ul class="mt-2 space-y-2 text-slate-700 text-base">
              <li v-for="it in tips" :key="it" class="flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-indigo-500"><path d="M20 6L9 17l-5-5"/></svg>
                <span>{{ it }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
