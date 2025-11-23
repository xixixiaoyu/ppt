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
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8 text-center">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400"
      >
        优化策略 (四)：查询改写
      </h2>
      <p class="mt-2 text-slate-600 max-w-2xl mx-auto">
        用户的原始问题往往不完美。在检索前“预处理”问题，是提升召回率的关键一步。
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Challenges -->
      <div class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-2xl p-6">
        <h3 class="text-xl font-bold text-slate-800 mb-4">原始问题的挑战</h3>
        <ul class="space-y-4">
          <li v-for="(item, i) in challenges" :key="i" class="flex items-start gap-3">
            <span class="font-mono text-amber-600 text-sm mt-1">// {{ item.type }}</span>
            <p class="text-slate-700 text-sm flex-1">{{ item.description }}</p>
          </li>
        </ul>
      </div>

      <!-- Solutions -->
      <div
        class="relative rounded-2xl p-6 bg-white/70 backdrop-blur-md border border-transparent bg-clip-padding before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-gradient-to-r before:from-indigo-500 before:to-fuchsia-500"
      >
        <h3 class="text-xl font-bold text-slate-900 mb-4">查询改写技术</h3>
        <ul class="space-y-4">
          <li v-for="(item, i) in solutions" :key="i" class="flex items-start gap-3">
            <span class="font-mono text-sky-600 text-sm mt-1">// {{ item.type }}</span>
            <p class="text-slate-700 text-sm flex-1">{{ item.description }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-8 text-center">
      <p
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/40 backdrop-blur-md text-slate-700 text-sm"
      >
        💡 目标：将用户的“口语化”问题，转化为机器最容易理解的“结构化”检索指令。
      </p>
    </div>
  </section>
</template>
