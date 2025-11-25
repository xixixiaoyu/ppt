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
    type: '扩写',
    description: '“找张伟” → “请列出公司所有叫张伟的员工及其部门信息。”',
  },
  {
    type: '分解',
    description: '“张伟不在，找谁？” → 1. 查张伟职责；2. 查谁有相同职责。',
  },
  {
    type: '打标',
    description: '“工程师的注意点” → 过滤 `role: "工程师"` + 检索 “注意点”。',
  },
  {
    type: '同义词归一化',
    description: '“笔记本” ↔ “手提电脑”，统一关键词以提升匹配率。',
  },
  {
    type: '限制条件注入',
    description: '补充时间、地域、部门等限制，避免过宽检索带来噪声。',
  },
  {
    type: '关键词扩展',
    description: '自动扩展相关术语与缩写，如 “KPI” ↔ “关键绩效指标”。',
  },
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
