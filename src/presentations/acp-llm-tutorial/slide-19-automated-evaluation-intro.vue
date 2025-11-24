<script setup lang="ts">
import { CheckBadgeIcon, DocumentMagnifyingGlassIcon, MagnifyingGlassCircleIcon, ArrowsPointingInIcon } from '@heroicons/vue/24/outline'
import Section from '@/shared/ui/Section.vue'
import Card from '@/shared/ui/Card.vue'
import HeadingGradient from '@/shared/ui/HeadingGradient.vue'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const why = {
  title: '为何需要自动化评测？',
  description: '手动评测主观、耗时且难以扩展。一个可靠的评测体系能帮助我们：',
  points: [
    { strong: '量化改进', text: '精确度量每次优化的效果。' },
    { strong: '持续集成', text: '在开发流程中自动监控模型质量。' },
    { strong: '发现问题', text: '定位模型在特定场景下的短板。' },
  ],
}

const metrics = [
  { icon: CheckBadgeIcon, name: 'Faithfulness (忠实度)', description: '回答是否基于所提供的上下文。' },
  { icon: DocumentMagnifyingGlassIcon, name: 'Answer Relevancy (相关性)', description: '回答是否切中用户问题。' },
  { icon: MagnifyingGlassCircleIcon, name: 'Context Precision (上下文精确度)', description: '检索到的上下文，有多少是相关的？' },
  { icon: ArrowsPointingInIcon, name: 'Context Recall (上下文召回率)', description: '相关上下文中，有多少被成功检索出来了？' },
]

const frameworks = {
  title: '主流评测框架：你的“模型质检员”',
  items: ['Ragas', 'TruLens', 'DeepEval'],
  description: '这些工具提供了标准化的评测流程和指标，是构建健壮 RAG 应用的得力助手。',
}
</script>

<template>
  <Section>
    <div class="text-center mb-8">
      <HeadingGradient :level="2" size="5xl">提效篇：自动化评测</HeadingGradient>
      <p class="mt-2 text-slate-600 max-w-3xl mx-auto">
        告别“感觉良好”，用数据驱动模型迭代。
      </p>
    </div>

    <div class="grid place-items-center">
      <div class="w-full max-w-6xl space-y-8">
        <!-- Why -->
        <Card padding="md" class="transition hover:-translate-y-0.5">
          <h3 class="text-xl font-bold text-slate-900 mb-2">{{ why.title }}</h3>
          <p class="text-slate-700 text-sm mb-4">{{ why.description }}</p>
          <ul class="space-y-2 text-sm">
            <li v-for="point in why.points" :key="point.strong" class="text-slate-800">
              <strong class="font-semibold text-indigo-700">{{ point.strong }}：</strong>{{ point.text }}
            </li>
          </ul>
        </Card>

        <!-- Metrics -->
        <div>
          <h3 class="text-xl font-bold text-slate-800 mb-4 text-center">四大核心评测指标</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card v-for="metric in metrics" :key="metric.name" padding="md" class="text-center transition hover:-translate-y-0.5">
              <div class="flex justify-center mb-3">
                <component :is="metric.icon" class="h-10 w-10 text-indigo-500" />
              </div>
              <h4 class="font-bold text-slate-900 text-base">{{ metric.name }}</h4>
              <p class="text-slate-700 text-sm mt-1">{{ metric.description }}</p>
            </Card>
          </div>
        </div>

        <!-- Frameworks -->
        <Card padding="md" class="text-center transition hover:-translate-y-0.5">
          <h3 class="text-xl font-bold text-slate-900 mb-3">{{ frameworks.title }}</h3>
          <div class="flex justify-center gap-8 items-center">
            <span v-for="item in frameworks.items" :key="item" class="text-2xl font-mono text-slate-800 font-semibold">{{ item }}</span>
          </div>
          <p class="mt-3 text-slate-600 text-sm">{{ frameworks.description }}</p>
        </Card>
      </div>
    </div>
  </Section>
</template>
