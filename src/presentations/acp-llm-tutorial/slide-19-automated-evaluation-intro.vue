<script setup lang="ts">
import { CheckBadgeIcon, DocumentMagnifyingGlassIcon, MagnifyingGlassCircleIcon, ArrowsPointingInIcon } from '@heroicons/vue/24/outline'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const why = {
  title: '为何需要自动化评测？',
  description: '手动评测主观、耗时且难以扩展。一个可靠的评测体系能帮我们：',
  points: [
    '量化改进：精确度量每次优化的效果。',
    '持续集成：在开发流程中自动监控模型质量。',
    '发现问题：定位模型在特定场景下的短板。'
  ]
}

const metrics = [
  { icon: CheckBadgeIcon, name: 'Faithfulness (忠实度)', description: '回答是否基于所提供的上下文。' },
  { icon: DocumentMagnifyingGlassIcon, name: 'Answer Relevancy (相关性)', description: '回答是否切中用户问题。' },
  { icon: MagnifyingGlassCircleIcon, name: 'Context Precision (上下文精确度)', description: '检索到的上下文，有多少是相关的？' },
  { icon: ArrowsPointingInIcon, name: 'Context Recall (上下文召回率)', description: '相关上下文中，有多少被成功检索出来了？' }
]

const frameworks = {
  title: '主流评测框架：你的“模型质检员”',
  items: ['Ragas', 'TruLens', 'DeepEval'],
  description: '这些工具提供了标准化的评测流程和指标，是构建健壮 RAG 应用的得力助手。'
}
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center p-8">
    <div class="text-center mb-8 max-w-4xl">
      <h2 class="text-4xl font-bold text-slate-900">提效篇：自动化评测</h2>
      <p class="text-lg text-slate-600 mt-2">告别“感觉良好”，用数据驱动模型迭代。</p>
    </div>

    <div class="grid grid-cols-4 grid-rows-2 gap-6 w-full max-w-6xl h-[400px]">
      <!-- Central Card -->
      <div class="col-span-2 row-span-2 bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-8 flex flex-col justify-center">
        <h3 class="text-2xl font-bold mb-4 text-slate-900">{{ why.title }}</h3>
        <p class="text-slate-600 mb-4">{{ why.description }}</p>
        <ul class="space-y-2 list-disc list-inside text-slate-700">
          <li v-for="point in why.points" :key="point" v-html="point.replace(/：/g, '：<strong>') + '</strong>'"></li>
        </ul>
      </div>

      <!-- Metrics Cards -->
      <div v-for="(metric, i) in metrics.slice(0, 2)" :key="metric.name" class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-lg p-6">
        <component :is="metric.icon" class="h-8 w-8 text-indigo-500 mb-2" />
        <h4 class="font-bold text-slate-800">{{ metric.name }}</h4>
        <p class="text-slate-600 text-sm mt-1">{{ metric.description }}</p>
      </div>
      <div v-for="metric in metrics.slice(2, 4)" :key="metric.name" class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-lg p-6">
        <component :is="metric.icon" class="h-8 w-8 text-indigo-500 mb-2" />
        <h4 class="font-bold text-slate-800">{{ metric.name }}</h4>
        <p class="text-slate-600 text-sm mt-1">{{ metric.description }}</p>
      </div>
    </div>

    <div class="mt-8 w-full max-w-6xl">
      <div class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6">
        <h3 class="text-xl font-bold text-slate-900 text-center mb-4">{{ frameworks.title }}</h3>
        <div class="flex justify-around items-center">
          <span v-for="item in frameworks.items" :key="item" class="text-2xl font-mono text-slate-800">{{ item }}</span>
        </div>
        <p class="mt-4 text-center text-slate-600 text-sm">{{ frameworks.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
