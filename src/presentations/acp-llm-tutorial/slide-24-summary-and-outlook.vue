<script setup lang="ts">
import {
  CubeIcon,
  CpuChipIcon,
  WrenchScrewdriverIcon,
  RocketLaunchIcon,
  BeakerIcon,
  CodeBracketSquareIcon
} from '@heroicons/vue/24/solid'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const takeaways = [
  {
    icon: CubeIcon,
    title: 'RAG 是基石',
    description: '大部分有价值的 LLM 应用都构建在高质量的 RAG 之上。掌握从基础到进阶的 RAG 技术栈，是构建差异化优势的关键。'
  },
  {
    icon: CpuChipIcon,
    title: 'Agent 是方向',
    description: '从被动生成到主动执行，Agent 范式重新定义了 AI 的能力边界。理解其“规划-执行-验证”的闭环是迈向 AGI 的重要一步。'
  },
  {
    icon: WrenchScrewdriverIcon,
    title: '工程化是保障',
    description: '可观测性、自动化评估、安全护栏和高效部署，共同构成了生产级 AI 应用的护城河，决定了应用能走多远。'
  }
]

const outlook = [
  {
    icon: BeakerIcon,
    title: '多模态与 Embodied AI',
    description: 'AI 将超越文本，理解并与物理世界交互。'
  },
  {
    icon: CodeBracketSquareIcon,
    title: '模型即代码 (Model-as-Code)',
    description: '通过代码管理和版本化模型与 Prompt，实现端到端的可追溯性与自动化。'
  },
  {
    icon: RocketLaunchIcon,
    title: 'AI 民主化与边缘计算',
    description: '更小、更强的端侧模型将驱动新一轮的应用创新。'
  }
]

const firstRag = {
  title: '你的第一个高质量 RAG 应用',
  steps: [
    '1. **最小闭环**: 搭建基础 RAG，打通端到端流程。',
    '2. **引入评估**: 建立可量化的评估体系 (Ragas/TruLens)。',
    '3. **优化检索**: 尝试查询重写与 Rerank，提升召回质量。',
    '4. **增强工程**: 实现流式输出、语义缓存与基本监控。'
  ]
}
</script>

<template>
  <section class="container mx-auto max-w-7xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="text-center mb-12 max-w-4xl mx-auto">
      <h2
        class="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 mb-4"
      >
        总结与展望
      </h2>
      <p class="text-xl text-slate-600 max-w-4xl mx-auto">
        从简单问答到生产级 AI 应用：掌握核心，拥抱未来。
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 mb-10">
      <div
        v-for="item in takeaways"
        :key="item.title"
        class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6 flex flex-col text-center transition hover:-translate-y-1"
      >
        <component :is="item.icon" class="h-10 w-10 mb-3 mx-auto text-indigo-600" />
        <h3 class="text-2xl font-bold mb-2 text-slate-800">{{ item.title }}</h3>
        <p class="text-slate-600 text-sm flex-grow">{{ item.description }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-8">
        <h3 class="text-2xl font-bold text-slate-800 mb-4">未来趋势展望</h3>
        <ul class="space-y-4">
          <li v-for="item in outlook" :key="item.title" class="flex items-start gap-4">
            <component :is="item.icon" class="h-6 w-6 text-emerald-500 shrink-0 mt-1" />
            <div>
              <h4 class="font-semibold text-slate-800">{{ item.title }}</h4>
              <p class="text-slate-600 text-sm">{{ item.description }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="bg-indigo-600/10 backdrop-blur-md border border-indigo-200/30 rounded-3xl shadow-xl p-8">
        <h3 class="text-2xl font-bold text-indigo-900 mb-4">从这里开始：构建你的第一个高质量 RAG</h3>
        <ul class="space-y-3 text-indigo-800/80">
          <li v-for="step in firstRag.steps" :key="step" class="flex items-start gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="text-indigo-500 shrink-0 mt-0.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/></svg>
            <span v-html="step"></span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
