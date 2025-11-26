<script setup lang="ts">
import { ref, computed } from 'vue'
import { highlight } from '../../utils/highlight'
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const tabs = [
  {
    id: 'offline',
    label: '离线阶段：数据准备 (Offline)',
    content: [
      '数据提取：从不同数据源 (如 Confluence, Notion, GitHub) 提取文档',
      '文本解析与分块：加载文档并将其切割成更小、更易于检索的文本块 (Chunk)',
      '向量化 (Embedding)：调用模型将文本块转换为高维向量',
      '建立索引：将文本块及其向量存储到专门的向量数据库中',
    ],
  },
  {
    id: 'online',
    label: '在线阶段：检索与生成 (Online)',
    content: [
      '问题向量化：当用户提问时，同样调用 Embedding 模型将其转换为向量',
      '相似度检索：在向量数据库中执行相似度搜索，召回与问题最相关的 Top-K 个文本块',
      '构建上下文与提示词 (Prompt)：将召回的文本块与原始问题整合成一个丰富的 Prompt',
      '调用大模型生成答案：将构建好的 Prompt 发送给大模型，获取最终答案',
    ],
  },
]
const activeTab = ref('offline')

const indexExample = `{
  'chunk_id': 'employee-handbook.md#3',
  'doc_id': 'employee-handbook.md',
  'text': '请假流程：员工需提前 3 天在 HR 系统提交申请，直属领导审批。',
  'embedding': [0.012, -0.234, 0.443, -0.017, 0.128, -0.065, 0.201, 0.089],
  'metadata': {
    'source': 'HR 手册',
    'page': 12,
    'tags': ['流程', '假期']
  }
}`

const promptExample = `你是一位知识库问答助手。根据给定的上下文回答用户问题；若答案不在上下文中，请明确说明并提出澄清问题。

问题：
“项目管理用什么工具？”

上下文：
[1] 文档 'project-management.md' 段落 3：
我们统一使用 Jira 进行需求、任务与缺陷管理，所有团队需在入职一周内创建项目并配置工作流。

[2] 文档 'onboarding.md' 段落 7：
新成员需要加入公司 Jira 组织，并在个人主页完成权限申请。

要求：
- 直接给出结论并简要引用依据
- 使用中文作答，保持简洁准确
- 若不确定，请给出澄清问题`

const highlightedIndexExample = computed(() => highlight(indexExample, 'json'))
const highlightedPromptExample = computed(() => highlight(promptExample, 'markdown'))
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8 text-center">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
      >
        RAG 的工作流程
      </h2>
      <p class="mt-2 text-slate-600 max-w-2xl mx-auto">
        流程分为“离线的数据准备”和“在线的检索生成”两个阶段。
      </p>
    </div>

    <div class="flex flex-wrap items-center justify-center gap-2">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/40 backdrop-blur-md shadow-sm text-slate-800 transition hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
        :class="{ '!bg-white/90 ring-2 ring-accent/60': activeTab === tab.id }"
      >
        {{ tab.label }}
      </button>
    </div>

    <div
      class="mt-6 rounded-3xl border border-slate-200/30 bg-white/70 backdrop-blur-md shadow-xl p-6 md:p-8 min-h-[240px] transition hover:-translate-y-0.5"
    >
      <ul class="space-y-3 text-slate-700 text-lg">
        <li
          v-for="(item, index) in tabs.find((t) => t.id === activeTab)?.content"
          :key="index"
          class="flex items-start gap-3"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            class="text-emerald-500/80 shrink-0 mt-1.5"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>

    <div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Example 1: Index -->
      <div class="relative group">
        <div
          class="absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-emerald-400/30 to-teal-500/30 opacity-40 blur-xl transition duration-700 group-hover:opacity-80"
        ></div>
        <div
          class="relative h-full rounded-2xl bg-[#1e1e1e] border border-white/10 overflow-hidden shadow-2xl flex flex-col"
        >
          <div
            class="flex items-center justify-between gap-2 px-4 py-3 border-b border-white/5 bg-white/5"
          >
            <div class="flex gap-2">
              <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <span class="text-xs font-mono text-white/30 uppercase tracking-wider">
              INDEX_EXAMPLE.JSON
            </span>
          </div>
          <div class="p-6 overflow-y-auto custom-scrollbar max-h-[400px]">
            <pre
              class="font-mono text-sm leading-relaxed text-blue-100/90"
            ><code class="whitespace-pre-wrap" v-html="highlightedIndexExample" /></pre>
          </div>
        </div>
      </div>

      <!-- Example 2: Prompt -->
      <div class="relative group">
        <div
          class="absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-blue-400/30 to-indigo-500/30 opacity-40 blur-xl transition duration-700 group-hover:opacity-80"
        ></div>
        <div
          class="relative h-full rounded-2xl bg-[#1e1e1e] border border-white/10 overflow-hidden shadow-2xl flex flex-col"
        >
          <div
            class="flex items-center justify-between gap-2 px-4 py-3 border-b border-white/5 bg-white/5"
          >
            <div class="flex gap-2">
              <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <span class="text-xs font-mono text-white/30 uppercase tracking-wider">
              PROMPT_TEMPLATE.MD
            </span>
          </div>
          <div class="p-6 overflow-y-auto custom-scrollbar max-h-[400px]">
            <pre
              class="font-mono text-sm leading-relaxed text-blue-100/90"
            ><code class="whitespace-pre-wrap" v-html="highlightedPromptExample" /></pre>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
}
</style>
