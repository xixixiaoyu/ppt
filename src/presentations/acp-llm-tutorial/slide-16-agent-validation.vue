<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const steps = [
  { title: '1. 引导 (Guide)', description: '在 Prompt 中明确指令和 JSON Schema' },
  { title: '2. LLM 生成', description: '大模型尝试生成符合格式的 JSON' },
  { title: '3. 校验 (Validate)', description: '用 Pydantic 模型解析并验证输出' }
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8 text-center">
      <h2 class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400">
        Agent 的“可靠性”：引导-校验-重试
      </h2>
      <p class="mt-2 text-slate-600 max-w-2xl mx-auto">如何确保 Agent 的“思考”能被程序 100% 理解并执行？</p>
    </div>

    <div class="text-center mb-10">
      <h3 class="text-2xl font-bold text-slate-800 mb-6">Pydantic 驱动的稳定输出流程</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="(step, i) in steps" :key="step.title" class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-2xl p-6 shadow-lg"
             :class="{ 'relative border-transparent bg-clip-padding before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-gradient-to-r before:from-indigo-500 before:to-fuchsia-500': i === 2 }">
          <h4 class="text-lg font-bold text-slate-900 mb-2">{{ step.title }}</h4>
          <p class="text-slate-700 text-sm">{{ step.description }}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Success Path -->
      <div class="bg-green-50/70 backdrop-blur-md border border-green-200/50 rounded-2xl p-6">
        <h4 class="text-lg font-bold text-green-800 mb-2">✅ 成功？</h4>
        <p class="text-green-700 text-sm">执行工具调用，继续 Agent 的下一步。</p>
      </div>
      <!-- Failure Path -->
      <div class="bg-amber-50/70 backdrop-blur-md border border-amber-200/50 rounded-2xl p-6">
        <h4 class="text-lg font-bold text-amber-800 mb-2">❌ 失败？</h4>
        <p class="text-amber-700 text-sm">将错误信息反馈给 LLM，令其修正（重试）。</p>
      </div>
    </div>

    <div class="mt-8 text-center">
      <p class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/40 backdrop-blur-md text-slate-700 text-sm">
        💡 这个“引导-校验-重试”循环是构建生产级 Agent 应用的基石。
      </p>
    </div>
  </section>
</template>
