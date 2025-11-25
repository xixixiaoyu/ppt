<script setup lang="ts">
import { BookOpenIcon, CpuChipIcon, SparklesIcon } from '@heroicons/vue/24/outline'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const concepts = {
  rag: { name: 'RAG (外挂)', description: '通过外部知识库提供信息，模型本身不变。', color: 'fuchsia' },
  finetuning: { name: 'Fine-tuning (内化)', description: '用特定数据训练，直接改变模型权重，使其成为领域专家。', color: 'indigo' },
}

const steps = [
  {
    icon: BookOpenIcon,
    title: '1. 准备“教材”',
    description: '构建高质量、领域特定的问答数据集 (JSONL 格式)。',
  },
  {
    icon: CpuChipIcon,
    title: '2. “因材施教”',
    description: '用梯度下降学习“标准答案”，逐步降低损失 (Loss)。',
    highlight: true,
  },
  {
    icon: SparklesIcon,
    title: '3. “学成出师”',
    description: '获得一个在特定任务上表现更出色、更高效的“专家模型”。',
  },
]

const caveats = [
  '数据质量优先于数据量，避免噪声与偏见',
  '训练-验证-测试三分法，防止过拟合',
  '任务明确：分类、抽取、长文总结各有最佳实践',
  '成本评估：显存、时长与云资源费用',
  '安全合规：隐私与版权数据不可用于训练'
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="text-center mb-8">
      <h2 class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70">提效篇：模型微调 (Fine-tuning)</h2>
      <p class="mt-2 text-slate-600 max-w-3xl mx-auto">
        当 RAG 遇到瓶颈，需要模型“内功修炼”。
      </p>
    </div>

    <div class="grid place-items-center">
      <div class="w-full max-w-6xl space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="c in concepts" :key="c.name" class="bg-white/70 backdrop-blur-md p-6 border border-slate-200/30 rounded-3xl shadow-xl">
            <h4 class="font-bold text-lg" :class="`text-${c.color}-700`">{{ c.name }}</h4>
            <p class="text-slate-700 text-sm mt-1">{{ c.description }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="step in steps"
            :key="step.title"
            class="bg-white/70 backdrop-blur-md p-6 border border-slate-200/30 rounded-3xl shadow-xl text-center transition hover:-translate-y-0.5"
            :class="{ 'ring-2 ring-indigo-500/50': step.highlight }"
          >
            <div class="flex justify-center mb-3">
              <component :is="step.icon" class="h-10 w-10 text-indigo-500" />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">{{ step.title }}</h3>
            <p class="text-slate-700 text-sm">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 flex justify-center">
      <div class="bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/30 shadow-xl">
        <p class="text-slate-600 text-sm">
          💡 微调成本高昂但对提升模型的“专业能力”至关重要。
        </p>
      </div>
    </div>

    <div class="mt-8 w-full max-w-6xl mx-auto">
      <div class="bg-white/70 backdrop-blur-md p-6 border border-slate-200/30 rounded-3xl shadow-xl">
        <h3 class="text-xl font-bold text-slate-900 mb-2">实践注意事项</h3>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-700">
          <li v-for="it in caveats" :key="it" class="flex items-start gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-indigo-500"><path d="M20 6L9 17l-5-5"/></svg>
            <span>{{ it }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
