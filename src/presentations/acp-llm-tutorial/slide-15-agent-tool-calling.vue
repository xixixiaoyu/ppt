<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const steps = [
  {
    title: '1. 定义工具',
    description: '向大模型提供一份“能力清单”，告诉它能做什么，以及如何使用。',
    code: `- web_search(query: str)\n- search_arxiv_paper(query: str)`,
  },
  {
    title: '2. 选择工具',
    description: '大模型根据用户意图，像路由器一样选择最合适的工具。',
  },
  {
    title: '3. 生成参数',
    description: '大模型以严格的 JSON 格式，生成调用工具所需的“投喂”数据。',
    code: `{\n  "tool_name": "search_arxiv_paper",\n  "parameters": {\n    "query": "latest AI papers"\n  }\n}`,
  },
]
</script>

<template>
  <section class="h-full w-full grid grid-rows-[auto_1fr] p-6 lg:p-10">
    <div class="flex-none">
      <h2 class="text-4xl font-extrabold">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-500">
          Agent 的“行动”：工具调用
        </span>
      </h2>
      <p class="mt-2 text-slate-600 max-w-3xl">
        这是赋予 Agent 执行能力的魔法棒，让它能与外部世界交互。
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 items-start pt-6">
      <!-- Step 1: Define Tools -->
      <div
        class="bg-white/60 backdrop-blur-sm p-6 border rounded-2xl shadow-lg flex flex-col h-full transition hover:-translate-y-0.5"
      >
        <h3 class="text-xl font-bold text-slate-900 mb-2">{{ steps[0].title }}</h3>
        <p class="text-slate-700 text-sm flex-grow">{{ steps[0].description }}</p>
        <pre
          class="mt-4 bg-slate-800 text-slate-100 rounded-lg p-3 text-xs font-mono whitespace-pre-wrap"
        ><code>{{ steps[0].code }}</code></pre>
      </div>

      <!-- Step 2: Select Tool -->
      <div
        class="bg-white/60 backdrop-blur-sm p-6 border rounded-2xl shadow-lg flex flex-col h-full transition hover:-translate-y-0.5"
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
        class="bg-white/60 backdrop-blur-sm p-6 border rounded-2xl shadow-lg flex flex-col h-full transition hover:-translate-y-0.5"
      >
        <h3 class="text-xl font-bold text-slate-900 mb-2">{{ steps[2].title }}</h3>
        <p class="text-slate-700 text-sm flex-grow">{{ steps[2].description }}</p>
        <pre
          class="mt-4 bg-slate-800 text-slate-100 rounded-lg p-3 text-xs font-mono whitespace-pre-wrap"
        ><code>{{ steps[2].code }}</code></pre>
      </div>
    </div>
  </section>
</template>
