<script setup lang="ts">
import { ref } from 'vue'
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const activeTab = ref('fc')

const tabs = [
  {
    id: 'fc',
    label: 'Function Calling (工具调用)',
    description: '让大模型能够调用外部工具，实现与真实世界的交互。',
    points: [
      '核心原理：模型输出结构化的函数调用请求（JSON 格式），而非纯文本。',
      '执行流程：用户提问 → 模型决定调用工具 → 系统执行 → 结果回传 → 生成回答。',
      '典型应用：联网搜索、数据库查询、软件操作、代码执行等。',
    ],
  },
  {
    id: 'mcp',
    label: 'MCP (Model Context Protocol)',
    description:
      'Anthropic 提出的开放标准，统一 AI 模型与数据源/工具的连接方式。',
    points: [
      '解决问题：避免为每个数据源和 AI 应用重复开发适配器（降低 N×M 复杂度）。',
      '核心价值：一次开发，多处使用。类似 AI 时代的 USB 协议。',
      '三大组件：Resources（数据资源）、Prompts（提示模板）、Tools（可执行工具）。',
    ],
  },
]

const fcExample = `// 用户提问: "北京今天天气如何？"

// 模型输出函数调用:
{
  "tool_calls": [{
    "name": "get_weather",
    "arguments": { "location": "Beijing" }
  }]
}

// 系统执行并返回: "25°C, 晴朗"

// 模型最终回答:
"北京今天天气晴朗，气温 25°C。"`

const mcpExample = `// MCP Server 标准定义
{
  "name": "weather-server",
  "tools": [{
    "name": "get_forecast",
    "description": "获取天气预报",
    "inputSchema": {
      "type": "object",
      "properties": {
        "city": { "type": "string" }
      }
    }
  }]
}

// 一次开发，多处使用：
// ✅ Claude Desktop
// ✅ Cursor 编辑器
// ✅ 其他 AI 应用
// 无需重复集成！`
</script>

<template>
  <section
    class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 pt-8 lg:pt-10 pb-12 lg:pb-16"
  >
    <div class="mb-6 text-center -mt-8">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70 leading-tight"
      >
        Function Calling & MCP
      </h2>
      <p class="mt-3 text-slate-600 max-w-2xl mx-auto">
        赋予大模型执行能力，建立统一的连接标准。
      </p>
    </div>

    <div class="flex flex-wrap items-center justify-center gap-2 mb-8">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 border border-white/40 backdrop-blur-md shadow-sm text-slate-700 font-medium transition hover:bg-white/80 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
        :class="{
          '!bg-white/95 text-accent ring-2 ring-accent/20 shadow-md':
            activeTab === tab.id,
        }"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <!-- Left: Concepts -->
      <div
        class="rounded-3xl border border-slate-200/50 bg-white/60 backdrop-blur-xl shadow-xl p-6 md:p-8 transition hover:shadow-2xl hover:-translate-y-1 duration-300 h-full"
      >
        <div
          v-for="tab in tabs"
          :key="tab.id"
          v-show="activeTab === tab.id"
          class="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <h3
            class="text-2xl font-bold text-slate-800 mb-3 flex items-center gap-2"
          >
            {{ tab.label }}
          </h3>
          <p
            class="text-slate-600 mb-8 text-lg leading-relaxed border-l-4 border-accent/30 pl-4"
          >
            {{ tab.description }}
          </p>
          <ul class="space-y-6">
            <li
              v-for="(point, idx) in tab.points"
              :key="idx"
              class="flex items-start gap-4"
            >
              <div
                class="shrink-0 mt-1 w-8 h-8 rounded-full bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-accent/20"
              >
                {{ idx + 1 }}
              </div>
              <span
                class="text-slate-700 leading-relaxed text-base pt-0.5 font-medium"
                >{{ point }}</span
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Right: Code/Example -->
      <div class="relative group h-full">
        <div
          class="absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-cyan-400/30 to-blue-500/30 opacity-60 blur-xl transition duration-700 group-hover:opacity-100"
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
            <span
              class="text-xs font-mono text-white/30 uppercase tracking-wider"
            >
              {{ activeTab === 'fc' ? 'Tool_Execution_Flow' : 'MCP_Standard' }}
            </span>
          </div>
          <div class="p-6 overflow-y-auto custom-scrollbar flex-1">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <pre
              class="font-mono text-sm leading-7 text-blue-100/90 whitespace-pre-wrap break-words"
            ><code v-html="activeTab === 'fc' ? fcExample : mcpExample"></code></pre>
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
