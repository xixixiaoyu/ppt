<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const steps = [
  { title: '1. 引导 (Guide)', description: '在 Prompt 中明确指令和 JSON Schema' },
  { title: '2. LLM 生成', description: '大模型尝试生成符合格式的 JSON' },
  { title: '3. 校验 (Validate)', description: '用 Pydantic 模型解析并验证输出' },
]

const checklist = [
  '严格 JSON Schema，字段与类型不可缺失',
  '允许空值但不允许非法枚举',
  '加入示例输出，降低格式错误概率',
  '失败重试带原因，让模型自我纠错',
  '工具调用设置超时与幂等'
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8">
      <h2 class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70">Agent 的“可靠性”：引导-校验-重试</h2>
      <p class="mt-2 text-slate-600 max-w-3xl">
        确保 Agent 思考可被程序准确执行：引导-校验-重试。
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
            class="bg-white/70 backdrop-blur-md p-6 border border-slate-200/30 rounded-3xl shadow-xl text-center transition hover:-translate-y-0.5"
            :class="{ 'ring-2 ring-indigo-500/50': i === 2 }"
          >
            <h4 class="text-lg font-bold text-slate-900 mb-2">{{ step.title }}</h4>
            <p class="text-slate-700 text-sm">{{ step.description }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <!-- Success Path -->
          <div
            class="bg-emerald-50/80 backdrop-blur-sm border border-emerald-200/80 rounded-3xl p-6 shadow-xl"
          >
            <h4 class="text-lg font-bold text-emerald-800 mb-2">✅ 成功？</h4>
            <p class="text-emerald-700 text-sm">执行工具调用，继续下一步。</p>
          </div>
          <!-- Failure Path -->
          <div class="bg-rose-50/80 backdrop-blur-sm border border-rose-200/80 rounded-3xl p-6 shadow-xl">
            <h4 class="text-lg font-bold text-rose-800 mb-2">❌ 失败？</h4>
            <p class="text-rose-700 text-sm">反馈错误给 LLM，修正重试。</p>
          </div>
        </div>

        <div class="mt-6 bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6">
          <h3 class="text-xl font-bold text-slate-800 mb-3">可靠性 Checklist</h3>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-700">
            <li v-for="it in checklist" :key="it" class="flex items-start gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-indigo-500"><path d="M20 6L9 17l-5-5"/></svg>
              <span>{{ it }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
