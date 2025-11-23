<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/solid'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const steps = [
  {
    name: '思考 (Think)',
    description: '分析需求，规划步骤，决定使用哪个工具。',
  },
  {
    name: '行动 (Act)',
    description: '调用工具 (如函数、API)，执行具体任务。',
  },
  {
    name: '观察 (Observe)',
    description: '获取工具的返回结果，总结反馈，评估进展。',
  },
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8 text-center">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400"
      >
        进阶篇：初识 Agent
      </h2>
      <p class="mt-2 text-slate-600 max-w-2xl mx-auto">
        如果说 RAG 让大模型变得“博学”，那么 Agent 则赋予了大模型“行动”的能力。
      </p>
    </div>

    <div class="relative">
      <div class="text-center mb-10">
        <h3 class="text-3xl font-bold text-slate-800">Agent 的核心：思考-行动-观察 闭环</h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12 md:gap-y-6 items-center">
        <template v-for="(step, i) in steps" :key="step.name">
          <div
            class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-2xl p-6 text-center shadow-lg"
          >
            <h4 class="text-xl font-bold text-slate-900 mb-2">{{ step.name }}</h4>
            <p class="text-slate-700 text-sm">{{ step.description }}</p>
          </div>
          <div v-if="i < steps.length - 1" class="hidden md:block text-center">
            <ArrowRightIcon class="h-10 w-10 text-slate-400 mx-auto" />
          </div>
        </template>
      </div>

      <div class="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center text-slate-500">
        <span>这个循环不断重复，直到最终任务完成。</span>
      </div>
    </div>

    <div class="mt-24 text-center">
      <p
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/40 backdrop-blur-md text-slate-700 text-sm"
      >
        💡 Agent 不再是被动回答，而是主动解决问题、与世界交互的智能体。
      </p>
    </div>
  </section>
</template>
