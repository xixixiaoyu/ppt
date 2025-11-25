<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/solid'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const steps = [
  {
    name: '规划 (Plan)',
    description: '将复杂任务分解为具体、可执行的子任务，并选择合适的工具 (Tool) 来完成。',
  },
  {
    name: '执行 (Execute)',
    description: '调用外部工具 (如 API 服务、数据库查询、代码执行器) 来执行子任务。',
  },
  {
    name: '验证 (Verify)',
    description:
      '评估上一步的执行结果，判断任务是否完成。如果未完成，则基于新的信息继续下一轮规划。',
  },
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
      >
        进阶篇：初识 Agent
      </h2>
      <p class="mt-2 text-slate-600 max-w-3xl">
        如果说 RAG 是给模型一个外部知识库，那么 Agent 就是给模型一套可操作的工具箱。
      </p>
    </div>

    <div class="grid place-items-center">
      <div class="w-full max-w-5xl">
        <h3 class="text-3xl font-bold text-slate-800 text-center mb-10">
          Agent 的核心：<span class="text-indigo-500">规划</span> →
          <span class="text-fuchsia-500">执行</span> →
          <span class="text-emerald-500">验证</span> 闭环
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
        <p class="text-center mt-8 text-slate-500">
          这个循环不断重复，直到最终任务完成，就像一位不知疲倦的工程师。
        </p>
      </div>
    </div>
  </section>
</template>
