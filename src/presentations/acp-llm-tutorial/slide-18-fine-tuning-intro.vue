<script setup lang="ts">
import { BookOpenIcon, CpuChipIcon, SparklesIcon } from '@heroicons/vue/24/outline'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const concepts = {
  rag: { name: 'RAG (外挂)', description: '通过外部知识库提供信息，模型本身不变。' },
  finetuning: { name: 'Fine-tuning (内化)', description: '用特定数据训练，直接改变模型权重，使其成为领域专家。' }
}

const steps = [
  {
    icon: BookOpenIcon,
    title: '1. 准备“教材”',
    description: '构建高质量、领域特定的问答数据集 (JSONL 格式)。'
  },
  {
    icon: CpuChipIcon,
    title: '2. “因材施教”',
    description: '通过梯度下降算法，让模型学习“标准答案”，逐步调整自身参数以减少“损失 (Loss)”。'
  },
  {
    icon: SparklesIcon,
    title: '3. “学成出师”',
    description: '获得一个在特定任务上表现更出色、更高效的“专家模型”。'
  }
]
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center p-8">
    <div class="text-center mb-10 max-w-4xl">
      <h2 class="text-4xl font-bold text-slate-900">提效篇：模型微调 (Fine-tuning)</h2>
      <p class="text-lg text-slate-600 mt-2">当 RAG 的“开卷考试”遇到瓶颈，我们需要为模型进行“内功修炼”。</p>

      <div class="mt-6 grid grid-cols-2 gap-4 text-left">
        <div class="bg-white/60 backdrop-blur-md border border-slate-200/30 rounded-2xl p-4">
          <h4 class="font-bold text-fuchsia-700">{{ concepts.rag.name }}</h4>
          <p class="text-slate-600 text-sm">{{ concepts.rag.description }}</p>
        </div>
        <div class="bg-white/60 backdrop-blur-md border border-slate-200/30 rounded-2xl p-4">
          <h4 class="font-bold text-indigo-700">{{ concepts.finetuning.name }}</h4>
          <p class="text-slate-600 text-sm">{{ concepts.finetuning.description }}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
      <div
        v-for="(step, i) in steps"
        :key="step.title"
        class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6 text-center"
        :class="{ 'relative border-transparent bg-clip-padding before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-gradient-to-r before:from-indigo-500 before:to-fuchsia-500 p-1': i === 1 }"
      >
        <div :class="{ 'bg-white rounded-[calc(1.5rem-0.25rem)] h-full': i === 1 }">
          <div class="flex justify-center mb-4">
            <component :is="step.icon" class="h-10 w-10 text-indigo-500" />
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">{{ step.title }}</h3>
          <p class="text-slate-600 text-sm">{{ step.description }}</p>
        </div>
      </div>
    </div>

    <div class="mt-10">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/40 backdrop-blur-md">
        <span class="text-slate-600 text-sm">💡 微调成本高昂但对提升模型的“专业能力”至关重要。</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
