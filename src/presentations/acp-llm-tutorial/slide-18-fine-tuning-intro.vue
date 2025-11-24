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
    description: '通过梯度下降算法，让模型学习“标准答案”，逐步调整自身参数以减少“损失 (Loss)”。',
    highlight: true,
  },
  {
    icon: SparklesIcon,
    title: '3. “学成出师”',
    description: '获得一个在特定任务上表现更出色、更高效的“专家模型”。',
  },
]
</script>

<template>
  <section class="h-full w-full grid grid-rows-[auto_1fr] p-6 lg:p-10">
    <div class="flex-none text-center">
      <h2 class="text-4xl font-extrabold">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-500">
          提效篇：模型微调 (Fine-tuning)
        </span>
      </h2>
      <p class="mt-2 text-slate-600 max-w-3xl mx-auto">
        当 RAG 的“开卷考试”遇到瓶颈，我们需要为模型进行“内功修炼”。
      </p>
    </div>

    <div class="grid place-items-center">
      <div class="w-full max-w-6xl space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="c in concepts" :key="c.name" class="bg-white/60 backdrop-blur-sm p-6 border rounded-2xl shadow-lg">
            <h4 class="font-bold text-lg" :class="`text-${c.color}-700`">{{ c.name }}</h4>
            <p class="text-slate-700 text-sm mt-1">{{ c.description }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="step in steps"
            :key="step.title"
            class="bg-white/60 backdrop-blur-sm p-6 border rounded-2xl shadow-lg text-center transition hover:-translate-y-0.5"
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

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2">
      <div class="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border shadow-md">
        <p class="text-slate-600 text-sm">
          💡 微调成本高昂但对提升模型的“专业能力”至关重要。
        </p>
      </div>
    </div>
  </section>
</template>
