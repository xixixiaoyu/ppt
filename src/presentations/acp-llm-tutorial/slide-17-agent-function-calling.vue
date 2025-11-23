<script setup lang="ts">
import { ArrowLongRightIcon } from '@heroicons/vue/24/solid'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const steps = [
  {
    title: '1. 大模型生成函数调用请求',
    description: '模型输出一个结构化的 JSON 对象，精确描述了它希望执行哪个函数以及使用什么参数。',
    code: `// LLM Output (JSON)
{
  "tool_name": "search_arxiv_paper",
  "parameters": {
    "query": "latest AI papers"
  }
}`,
  },
  {
    title: '2. 应用程序解析并执行',
    description: '你的代码接收这个 JSON，将其作为指令，去调用本地或远程的真实函数。',
    code: `// Your Application Code (e.g., Python)
def search_arxiv_paper(query: str):
    # ... code to search Arxiv API ...
    return results

# 1. Parse LLM output
llm_response = ...

# 2. Dispatch and execute
if llm_response['tool_name'] == 'search_arxiv_paper':
    query = llm_response['parameters']['query']
    results = search_arxiv_paper(query)
    # 3. (Optional) Send results back to LLM`,
  },
]
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center p-8">
    <div class="text-center mb-10">
      <h2 class="text-4xl font-bold text-slate-900">深入核心：Function Calling 机制</h2>
      <p class="text-lg text-slate-600 mt-2">
        Tool Calling 是“做什么”的应用概念，Function Calling 是“怎么做”的技术实现。
      </p>
    </div>

    <div class="flex items-center justify-center gap-8 w-full max-w-6xl">
      <!-- Step 1: LLM Output -->
      <div
        class="flex-1 bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6"
      >
        <h3 class="text-2xl font-bold mb-4 text-slate-800">{{ steps[0].title }}</h3>
        <p class="text-slate-600 mb-4 text-sm">{{ steps[0].description }}</p>
        <pre
          class="bg-slate-900/80 text-slate-100 rounded-2xl border border-white/10 p-4 text-left font-mono text-sm whitespace-pre-wrap"
        ><code>{{ steps[0].code }}</code></pre>
      </div>

      <!-- Arrow -->
      <div class="flex-shrink-0">
        <ArrowLongRightIcon class="h-12 w-12 text-slate-400" />
      </div>

      <!-- Step 2: Application Execution -->
      <div
        class="flex-1 bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6"
      >
        <h3 class="text-2xl font-bold mb-4 text-slate-800">{{ steps[1].title }}</h3>
        <p class="text-slate-600 mb-4 text-sm">{{ steps[1].description }}</p>
        <pre
          class="bg-slate-900/80 text-slate-100 rounded-2xl border border-white/10 p-4 text-left font-mono text-sm whitespace-pre-wrap"
        ><code>{{ steps[1].code }}</code></pre>
      </div>
    </div>

    <div class="mt-10">
      <div
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/40 backdrop-blur-md"
      >
        <span class="text-slate-600 text-sm"
          >💡 Function Calling 是连接大语言模型与现有软件生态系统的桥梁。</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
