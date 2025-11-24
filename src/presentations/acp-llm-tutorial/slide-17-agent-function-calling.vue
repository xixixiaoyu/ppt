<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLongRightIcon } from '@heroicons/vue/24/solid'
import { highlight } from '../../utils/highlight'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const steps = [
  {
    title: '1. LLM 生成函数调用',
    description: '模型输出结构化的 JSON 对象，精确描述希望执行的函数及参数。',
    language: 'json',
    code: `{
  "tool_name": "search_arxiv_paper",
  "parameters": {
    "query": "latest AI papers"
  }
}`,
  },
  {
    title: '2. 应用解析并执行',
    description: '你的代码接收此 JSON，作为指令调用本地或远程的真实函数。',
    language: 'python',
    code: `def search_arxiv_paper(query: str):
    # ... code to search Arxiv API ...
    return results

# 1. Parse LLM output
llm_response = get_llm_output()

# 2. Dispatch and execute
if llm_response.get('tool_name') == 'search_arxiv_paper':
    query = llm_response['parameters']['query']
    results = search_arxiv_paper(query)
    # 3. (Optional) Send results back to LLM`,
  },
]

const highlightedCode = computed(() => steps.map(step => highlight(step.code, step.language)))
</script>

<template>
  <section class="h-full w-full grid grid-rows-[auto_1fr] p-6 lg:p-10">
    <div class="flex-none text-center">
      <h2 class="text-4xl font-extrabold">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-500">
          深入核心：Function Calling 机制
        </span>
      </h2>
      <p class="mt-2 text-slate-600 max-w-3xl mx-auto">
        Tool Calling 是“做什么”的应用概念，Function Calling 是“怎么做”的技术实现。
      </p>
    </div>

    <div class="grid place-items-center">
      <div class="w-full max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6">
        <!-- Step 1: LLM Output -->
        <div class="bg-white/60 backdrop-blur-sm p-6 border rounded-2xl shadow-lg h-full flex flex-col">
          <h3 class="text-xl font-bold text-slate-900 mb-2">{{ steps[0].title }}</h3>
          <p class="text-slate-700 text-sm mb-4 flex-none">{{ steps[0].description }}</p>
          <div class="flex-grow bg-slate-900/80 text-slate-100 rounded-xl border border-white/10 p-4 font-mono text-sm overflow-auto">
            <pre><code class="whitespace-pre-wrap" v-html="highlightedCode[0]" /></pre>
          </div>
        </div>

        <!-- Arrow -->
        <div class="hidden md:block">
          <ArrowLongRightIcon class="h-12 w-12 text-slate-400" />
        </div>

        <!-- Step 2: Application Execution -->
        <div class="bg-white/60 backdrop-blur-sm p-6 border rounded-2xl shadow-lg h-full flex flex-col">
          <h3 class="text-xl font-bold text-slate-900 mb-2">{{ steps[1].title }}</h3>
          <p class="text-slate-700 text-sm mb-4 flex-none">{{ steps[1].description }}</p>
          <div class="flex-grow bg-slate-900/80 text-slate-100 rounded-xl border border-white/10 p-4 font-mono text-sm overflow-auto">
            <pre><code class="whitespace-pre-wrap" v-html="highlightedCode[1]" /></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2">
      <div class="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border shadow-md">
        <p class="text-slate-600 text-sm">
          💡 Function Calling 是连接大语言模型与现有软件生态系统的桥梁。
        </p>
      </div>
    </div>
  </section>
</template>
