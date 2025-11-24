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
    <div class="mb-8">
      <h2 class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70">进阶篇：初识 Agent</h2>
      <p class="mt-2 text-slate-600 max-w-3xl">
        如果说 RAG 让大模型变得“博学”，那么 Agent 则赋予了大模型“行动”的能力。
      </p>
    </div>

    <div class="grid place-items-center">
      <div class="w-full max-w-5xl">
        <h3 class="text-3xl font-bold text-slate-800 text-center mb-10">
          Agent 的核心：<span class="text-indigo-500">思考</span> →
          <span class="text-fuchsia-500">行动</span> →
          <span class="text-emerald-500">观察</span> 闭环
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          <div
            class="bg-white/70 backdrop-blur-md p-6 border border-slate-200/30 rounded-3xl shadow-xl text-center h-full transition hover:-translate-y-0.5"
          >
            <h4 class="text-xl font-bold text-slate-900 mb-2">{{ steps[0].name }}</h4>
            <p class="text-slate-700 text-sm">{{ steps[0].description }}</p>
          </div>

          <ArrowRightIcon class="h-10 w-10 text-slate-400 mx-auto" />

          <div
            class="bg-white/70 backdrop-blur-md p-6 border border-slate-200/30 rounded-3xl shadow-xl text-center h-full transition hover:-translate-y-0.5"
          >
            <h4 class="text-xl font-bold text-slate-900 mb-2">{{ steps[1].name }}</h4>
            <p class="text-slate-700 text-sm">{{ steps[1].description }}</p>
          </div>

          <ArrowRightIcon class="h-10 w-10 text-slate-400 mx-auto" />

          <div
            class="bg-white/70 backdrop-blur-md p-6 border border-slate-200/30 rounded-3xl shadow-xl text-center h-full transition hover:-translate-y-0.5"
          >
            <h4 class="text-xl font-bold text-slate-900 mb-2">{{ steps[2].name }}</h4>
            <p class="text-slate-700 text-sm">{{ steps[2].description }}</p>
          </div>
        </div>
        <p class="text-center mt-8 text-slate-500">这个循环不断重复，直到最终任务完成。</p>
      </div>
    </div>
  </section>
</template>
