<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const steps = [
  {
    title: '1. 定义工具',
    description: '提供能力清单，定义可做与用法。',
    code: `- web_search(query: str)\n- search_arxiv_paper(query: str)`,
  },
  {
    title: '2. 选择工具',
    description: '按意图路由最合适工具。',
  },
  {
    title: '3. 生成参数',
    description: '按 JSON 生成工具参数。',
    code: `{\n  "tool_name": "search_arxiv_paper",\n  "parameters": {\n    "query": "latest AI papers"\n  }\n}`,
  },
]

const pitfalls = [
  '定义不清：缺少参数含义与约束',
  '无示例：JSON 易出错',
  '无反馈：无法纠正',
  '长链路：缺少超时与并发控制',
  '安全缺失：未做最小权限',
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
      >
        Agent 的“行动”：工具调用
      </h2>
      <p class="mt-2 text-slate-600 max-w-3xl">赋予 Agent 执行能力，让其与外界交互。</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 items-start">
      <!-- Step 1: Define Tools -->
      <div
        class="bg-white/70 backdrop-blur-md p-6 border border-slate-200/30 rounded-3xl shadow-xl flex flex-col h-full transition hover:-translate-y-0.5"
      >
        <h3 class="text-xl font-bold text-slate-900 mb-2">{{ steps[0].title }}</h3>
        <p class="text-slate-700 text-sm flex-grow">{{ steps[0].description }}</p>
        <pre
          class="mt-4 bg-slate-900/80 text-slate-100 rounded-xl border border-white/10 p-3 text-xs font-mono whitespace-pre-wrap"
        ><code>{{ steps[0].code }}</code></pre>
      </div>

      <!-- Step 2: Select Tool -->
      <div
        class="bg-white/70 backdrop-blur-md p-6 border border-slate-200/30 rounded-3xl shadow-xl flex flex-col h-full transition hover:-translate-y-0.5"
      >
        <h3 class="text-xl font-bold text-slate-900 mb-2">{{ steps[1].title }}</h3>
        <p class="text-slate-700 text-sm flex-grow">{{ steps[1].description }}</p>
        <div class="mt-4 p-3 bg-slate-100 rounded-lg text-xs">
          <p class="text-slate-500">用户: "最新的 AI 论文有哪些？"</p>
          <p class="font-bold text-indigo-600 mt-2 text-center text-lg">⬇️</p>
          <p class="font-semibold text-slate-800 mt-1 text-center">
            LLM 决定使用 `search_arxiv_paper`
          </p>
        </div>
      </div>

      <!-- Step 3: Generate Parameters -->
      <div
        class="bg-white/70 backdrop-blur-md p-6 border border-slate-200/30 rounded-3xl shadow-xl flex flex-col h-full transition hover:-translate-y-0.5"
      >
        <h3 class="text-xl font-bold text-slate-900 mb-2">{{ steps[2].title }}</h3>
        <p class="text-slate-700 text-sm flex-grow">{{ steps[2].description }}</p>
        <pre
          class="mt-4 bg-slate-900/80 text-slate-100 rounded-xl border border-white/10 p-3 text-xs font-mono whitespace-pre-wrap"
        ><code>{{ steps[2].code }}</code></pre>
      </div>
    </div>
    <div class="mt-8">
      <div
        class="bg-white/70 backdrop-blur-md p-6 border border-slate-200/30 rounded-3xl shadow-xl"
      >
        <h3 class="text-xl font-bold text-slate-900 mb-2">常见陷阱与规避</h3>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-700">
          <li v-for="it in pitfalls" :key="it" class="flex items-start gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="text-rose-500"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span>{{ it }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
