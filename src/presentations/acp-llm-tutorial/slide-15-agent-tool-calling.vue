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
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8 text-center">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400"
      >
        Agent 的“行动”：工具调用
      </h2>
      <p class="mt-2 text-slate-600 max-w-2xl mx-auto">
        这是赋予 Agent 执行能力的魔法棒，让它能与外部世界交互。
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Step 1: Define Tools -->
      <div
        class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-2xl p-6 flex flex-col"
      >
        <h3 class="text-xl font-bold text-slate-900 mb-2">{{ steps[0].title }}</h3>
        <p class="text-slate-700 text-sm flex-grow">{{ steps[0].description }}</p>
        <pre
          class="mt-4 bg-slate-900/80 text-slate-100 rounded-lg p-3 text-xs font-mono whitespace-pre-wrap"
        ><code>{{ steps[0].code }}</code></pre>
      </div>

      <!-- Step 2: Select Tool -->
      <div
        class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-2xl p-6 flex flex-col"
      >
        <h3 class="text-xl font-bold text-slate-900 mb-2">{{ steps[1].title }}</h3>
        <p class="text-slate-700 text-sm flex-grow">{{ steps[1].description }}</p>
        <div class="mt-4 p-3 bg-slate-100/80 rounded-lg text-xs">
          <p class="text-slate-500">用户: "最新的 AI 论文有哪些？"</p>
          <p class="font-bold text-indigo-600 mt-2 text-sm">⬇️</p>
          <p class="font-semibold text-slate-800 mt-1">LLM 决定使用 `search_arxiv_paper`</p>
        </div>
      </div>

      <!-- Step 3: Generate Parameters -->
      <div
        class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-2xl p-6 flex flex-col"
      >
        <h3 class="text-xl font-bold text-slate-900 mb-2">{{ steps[2].title }}</h3>
        <p class="text-slate-700 text-sm flex-grow">{{ steps[2].description }}</p>
        <pre
          class="mt-4 bg-slate-900/80 text-slate-100 rounded-lg p-3 text-xs font-mono whitespace-pre-wrap"
        ><code>{{ steps[2].code }}</code></pre>
      </div>
    </div>

    <div class="mt-8 text-center">
      <p
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/40 backdrop-blur-md text-slate-700 text-sm"
      >
        💡 通过“定义-选择-生成”三部曲，Agent 将自然语言指令转化为了可执行的机器操作。
      </p>
    </div>
  </section>
</template>
