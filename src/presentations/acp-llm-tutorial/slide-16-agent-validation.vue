<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const steps = [
  {
    title: '1. 定义 Schema',
    description: '使用 Pydantic 或 JSON Schema 定义期望输出的严格数据结构。',
  },
  { title: '2. 指令遵循', description: 'LLM 根据 Schema 描述，尽力生成符合格式的 JSON 文本。' },
  {
    title: '3. 解析与验证',
    description: '程序尝试将 LLM 输出的文本解析为 Pydantic 对象，解析成功即验证通过。',
  },
]

const checklist = [
  {
    title: '强类型的 Schema 定义',
    content: '利用 Pydantic 或 JSON Schema 定义字段、类型、约束和枚举，这是可靠性的基石。',
  },
  {
    title: '携带错误信息的重试循环',
    content: '当解析失败时，将详细的验证错误信息反馈给 LLM，让它在下一轮自行纠正。',
  },
  {
    title: '使用成熟的解析库',
    content:
      '推荐使用 Instructor、Outlines 等库，它们将“定义-生成-验证-重试”的循环封装为标准模式，简化开发。',
  },
  {
    title: '防御性工程措施',
    content: '除了设置超时和确保幂等性，还应考虑 LLM API 调用的网络错误处理、降级策略等。',
  },
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
      >
        Agent 的“确定性”：结构化输出与自我修正
      </h2>
      <p class="mt-2 text-slate-600 max-w-3xl">
        让 LLM 的输出不再是“文本魔术”，而是可被程序精确解析和执行的“结构化数据”。
      </p>
    </div>

    <div class="grid place-items-center">
      <div class="w-full max-w-5xl space-y-8">
        <div class="text-center">
          <h3 class="text-2xl font-bold text-slate-800">强制输出结构化的核心思路</h3>
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
            <h4 class="text-lg font-bold text-emerald-800 mb-2">✅ 解析成功</h4>
            <p class="text-emerald-700 text-sm">获得类型安全的数据对象，执行后续业务逻辑。</p>
          </div>
          <!-- Failure Path -->
          <div
            class="bg-rose-50/80 backdrop-blur-sm border border-rose-200/80 rounded-3xl p-6 shadow-xl"
          >
            <h4 class="text-lg font-bold text-rose-800 mb-2">❌ 解析失败</h4>
            <p class="text-rose-700 text-sm">
              捕获验证错误 (e.g. "字段 a 类型错误")，反馈给 LLM，触发自我修正。
            </p>
          </div>
        </div>

        <div
          class="mt-6 bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6"
        >
          <h3 class="text-xl font-bold text-slate-800 mb-4">可靠性工程实践</h3>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-slate-700">
            <li v-for="item in checklist" :key="item.title" class="flex items-start gap-3">
              <svg
                class="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <div>
                <h4 class="font-semibold text-slate-800">{{ item.title }}</h4>
                <p class="text-slate-600">{{ item.content }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
