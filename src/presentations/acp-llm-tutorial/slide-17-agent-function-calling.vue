<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLongRightIcon } from '@heroicons/vue/24/solid'
import { highlight } from '../../utils/highlight'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const steps = [
  {
    title: '1. LLM 生成调用指令',
    description: 'LLM 的唯一职责是生成一个结构化的“调用指令”，清晰表达其意图和所需参数。',
    language: 'json',
    code: `{
  "function_name": "query_order_status",
  "parameters": {
    "order_id": "A202411259876"
  }
}`,
  },
  {
    title: '2. 分发器解析并执行',
    description: '后端“分发器”根据指令动态路由到具体实现，执行并返回结果，实现逻辑与 LLM 解耦。',
    language: 'python',
    code: `// 1. 定义并注册你的工具
tool_registry = {
    "query_order_status": query_order_status,
    "refund_order": refund_order,
}

// 2. LLM 生成调用指令
llm_output = get_llm_output()

// 3. 分发器解析并执行
tool_name = llm_output.get("function_name")
params = llm_output.get("parameters")

if tool_name in tool_registry:
    # 动态、安全地调用函数
    tool_function = tool_registry[tool_name]
    result = tool_function(**params)
else:
    # 处理工具未找到的错误
    result = f"Error: Tool '{tool_name}' not found."

# 4. 将结果返回给 LLM 主循环`,
  },
]

const highlightedCode = computed(() => steps.map((step) => highlight(step.code, step.language)))

const practices = [
  {
    title: '工具注册与发现',
    content: '建立一个集中的工具注册表，支持动态添加、版本化和权限控制。',
  },
  {
    title: '异步执行与并发控制',
    content:
      '对于耗时长的工具 (如 API 调用、数据分析)，分发器应支持异步执行，避免阻塞 Agent 主循环。',
  },
  {
    title: '统一的错误处理',
    content: '定义标准的错误格式，区分业务错误和技术错误，为 LLM 提供清晰的失败反馈以供其决策。',
  },
  {
    title: '可观测性 (Observability)',
    content:
      '对工具的调用频率、成功率、耗时和 token 消耗进行监控、日志记录和告警，这是优化和排错的基础。',
  },
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="text-center mb-8">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
      >
        Agent 架构模式：从路由到执行
      </h2>
      <p class="mt-2 text-slate-600 max-w-3xl mx-auto">
        Function Calling 是连接 LLM 意图与后端服务执行的标准化协议，是实现可扩展 Agent 的基石。
      </p>
    </div>

    <div class="grid place-items-center">
      <div class="w-full max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6">
        <!-- Step 1: LLM Output -->
        <div
          class="bg-white/70 backdrop-blur-md p-6 border border-slate-200/30 rounded-3xl shadow-xl h-full flex flex-col transition hover:-translate-y-0.5"
        >
          <h3 class="text-xl font-bold text-slate-900 mb-2">{{ steps[0].title }}</h3>
          <p class="text-slate-700 text-sm mb-4 flex-none">{{ steps[0].description }}</p>
          <div
            class="flex-grow bg-slate-900/80 text-slate-100 rounded-xl border border-white/10 p-4 font-mono text-sm overflow-auto"
          >
            <pre><code class="whitespace-pre-wrap" v-html="highlightedCode[0]" /></pre>
          </div>
        </div>

        <!-- Arrow -->
        <div class="hidden md:block">
          <ArrowLongRightIcon class="h-12 w-12 text-slate-400" />
        </div>

        <!-- Step 2: Application Execution -->
        <div
          class="bg-white/70 backdrop-blur-md p-6 border border-slate-200/30 rounded-3xl shadow-xl h-full flex flex-col transition hover:-translate-y-0.5"
        >
          <h3 class="text-xl font-bold text-slate-900 mb-2">{{ steps[1].title }}</h3>
          <p class="text-slate-700 text-sm mb-4 flex-none">{{ steps[1].description }}</p>
          <div
            class="flex-grow bg-slate-900/80 text-slate-100 rounded-xl border border-white/10 p-4 font-mono text-sm overflow-auto"
          >
            <pre><code class="whitespace-pre-wrap" v-html="highlightedCode[1]" /></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10 w-full max-w-6xl mx-auto">
      <div
        class="bg-white/70 backdrop-blur-md p-6 border border-slate-200/30 rounded-3xl shadow-xl"
      >
        <h3 class="text-xl font-bold text-slate-900 mb-4">分发器 (Dispatcher) 设计要点</h3>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-slate-700">
          <li v-for="item in practices" :key="item.title" class="flex items-start gap-3">
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
