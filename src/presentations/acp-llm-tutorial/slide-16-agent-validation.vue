<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const steps = [
  { title: '1. 引导 (Guide)', description: '在 Prompt 中明确指令和 JSON Schema' },
  { title: '2. LLM 生成', description: '大模型尝试生成符合格式的 JSON' },
  { title: '3. 校验 (Validate)', description: '用 Pydantic 模型解析并验证输出' },
]
</script>

<template>
  <section class="h-full w-full grid grid-rows-[auto_1fr] p-6 lg:p-10">
    <div class="flex-none">
      <h2 class="text-4xl font-extrabold">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-500">
          Agent 的“可靠性”：引导-校验-重试
        </span>
      </h2>
      <p class="mt-2 text-slate-600 max-w-3xl">
        如何确保 Agent 的“思考”能被程序 100% 理解并执行？这个“引导-校验-重试”循环是构建生产级 Agent
        应用的基石。
      </p>
    </div>

    <div class="grid place-items-center">
      <div class="w-full max-w-5xl space-y-8">
        <div class="text-center">
          <h3 class="text-2xl font-bold text-slate-800">Pydantic 驱动的稳定输出流程</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(step, i) in steps"
            :key="step.title"
            class="bg-white/60 backdrop-blur-sm p-6 border rounded-2xl shadow-lg text-center transition hover:-translate-y-0.5"
            :class="{ 'border-indigo-500/50': i === 2 }"
          >
            <h4 class="text-lg font-bold text-slate-900 mb-2">{{ step.title }}</h4>
            <p class="text-slate-700 text-sm">{{ step.description }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <!-- Success Path -->
          <div
            class="bg-emerald-50/80 backdrop-blur-sm border border-emerald-200/80 rounded-2xl p-6"
          >
            <h4 class="text-lg font-bold text-emerald-800 mb-2">✅ 成功？</h4>
            <p class="text-emerald-700 text-sm">执行工具调用，继续 Agent 的下一步。</p>
          </div>
          <!-- Failure Path -->
          <div class="bg-rose-50/80 backdrop-blur-sm border border-rose-200/80 rounded-2xl p-6">
            <h4 class="text-lg font-bold text-rose-800 mb-2">❌ 失败？</h4>
            <p class="text-rose-700 text-sm">将错误信息反馈给 LLM，令其修正（重试）。</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
