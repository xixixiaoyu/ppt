<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const challenges = [
  {
    type: '歧义性',
    description: '“找张伟” → 公司里有三个张伟，你问的是哪一个？',
  },
  {
    type: '不完整',
    description: '“RAG原理” → 是想了解工作流程、核心组件还是优缺点？',
  },
  {
    type: '错配词',
    description: '用户说“笔记本”，但知识库里全是“手提电脑”。',
  },
]

const solutions = [
  {
    type: '意图澄清与扩写',
    description: '将模糊的问题变得更具体。例如，“RAG原理” → “请详细解释RAG的工作流程，包括它的核心组件和关键步骤。”'
  },
  {
    type: '问题分解',
    description: '将一个复杂问题分解为多个可以独立检索的子问题。例如，“对比RAG和微调” → 1. RAG的优缺点是什么？ 2. 微调的优缺点是什么？ 3. 何时选择RAG？何时选择微调？'
  },
  {
    type: '假设性问题生成',
    description: '根据文档内容，反向生成可能的用户问题，并将其与文档一同索引，从而更好地匹配用户的真实提问。'
  },
  {
    type: '同义词与术语扩展',
    description: '自动将用户的提问扩展为包含同义词、缩写和相关术语的多个查询，以提高召回率。例如，“笔记本” → [“笔记本”, “手提电脑”, “Laptop”]。'
  }
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
      >
        优化：查询重写 (Query Rewriting)
      </h2>
      <p class="mt-2 text-slate-600 max-w-3xl">
        检索前预处理问题，提升召回率。
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
      <!-- Challenges -->
      <div
        class="bg-white/70 backdrop-blur-md p-6 lg:p-8 border border-slate-200/30 rounded-3xl shadow-xl h-full transition hover:-translate-y-0.5"
      >
        <h3 class="text-2xl font-bold text-slate-800 mb-4">挑战</h3>
        <ul class="space-y-4 text-slate-700">
          <li v-for="item in challenges" :key="item.type" class="flex items-start">
            <span class="font-bold text-indigo-600 w-16 flex-shrink-0">{{ item.type }}</span>
            <span class="ml-4">{{ item.description }}</span>
          </li>
        </ul>
      </div>

      <!-- Solutions -->
      <div
        class="bg-white/70 backdrop-blur-md p-6 lg:p-8 border border-emerald-500/50 rounded-3xl shadow-xl h-full transition hover:-translate-y-0.5"
      >
        <h3 class="text-2xl font-bold text-emerald-700 mb-4">解决方案</h3>
        <ul class="space-y-4 text-slate-700">
          <li v-for="item in solutions" :key="item.type" class="flex items-start">
            <span class="font-bold text-emerald-600 w-16 flex-shrink-0">{{ item.type }}</span>
            <span class="ml-4">{{ item.description }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
