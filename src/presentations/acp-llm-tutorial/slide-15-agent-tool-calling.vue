<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const steps = [
  {
    title: '1. 工具设计与描述',
    description: '为 LLM 设计清晰的 API 接口。描述比函数名更重要，它就是给 LLM 看的“API 文档”。',
    code: `[
  {
    "name": "query_order_status",
    "description": "查询指定订单号的最新状态，包括物流信息和预计送达时间。",
    "parameters": {
      "type": "object",
      "properties": {
        "order_id": {
          "type": "string",
          "description": "需要查询的订单号"
        }
      },
      "required": ["order_id"]
    }
  }
]`,
  },
  {
    title: '2. 工具路由 (Routing)',
    description: 'LLM 根据用户意图，像一个智能路由器一样，从众多工具中选择最匹配的一个。',
  },
  {
    title: '3. 参数填充 (Population)',
    description: 'LLM 从非结构化的用户对话中，自动提取结构化信息，填充到对应工具的参数中。',
    code: `{
  "tool_name": "query_order_status",
  "parameters": {
    "order_id": "A202411259876"
  }
}`,
  },
]

const bestPractices = [
  {
    title: '清晰的工具描述',
    content: '描述应详尽说明工具的功能、适用场景、参数含义与格式。LLM 的理解完全依赖于此。'
  },
  {
    title: '提供 Few-shot 示例',
    content: '对于复杂的工具，在 Prompt 中提供 1-2 个完整的调用示例，可以显著提高 LLM 的准确率。'
  },
  {
    title: '错误处理与重试机制',
    content: '工具执行可能失败 (API 超时、参数错误)。Agent 需要能“观察”到失败结果，并决定是重试、更换工具还是向用户澄清问题。'
  },
  {
    title: '流程控制',
    content: '对于需要多步调用的复杂任务，需要设计状态管理、超时控制和并发执行策略，避免无限循环或长时间等待。'
  },
  {
    title: '安全第一',
    content: '工具调用意味着赋予 LLM 操作真实世界的能力。务必遵循最小权限原则，对输入进行严格校验，防止恶意注入。'
  },
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
      >
        Agent 的“执行”：为 LLM 定义一套 API
      </h2>
      <p class="mt-2 text-slate-600 max-w-3xl">工具调用 (Tool Calling) 的本质，是让 LLM 学会像工程师一样，通过调用 API 与外部世界交互。</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
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
          <p class="text-slate-500">用户: "帮我查下订单 A202411259876 的状态"</p>
          <p class="font-bold text-indigo-600 mt-2 text-center text-lg">⬇️</p>
          <p class="font-semibold text-slate-800 mt-1 text-center">
            LLM 决定使用 `query_order_status`
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
    <div class="mt-10">
      <div
        class="bg-white/70 backdrop-blur-md p-6 border border-slate-200/30 rounded-3xl shadow-xl"
      >
        <h3 class="text-xl font-bold text-slate-900 mb-4">工程实践最佳原则</h3>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-slate-700">
          <li v-for="item in bestPractices" :key="item.title" class="flex items-start gap-3">
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
  </section>
</template>
