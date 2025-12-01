<script setup lang="ts">
import { highlight } from '@/utils/highlight'
import { computed, ref } from 'vue'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const steps = [
  {
    title: '1. 加载数据',
    desc: '从各种数据源（文件、API、数据库）加载原始文档',
    code: `import { SimpleDirectoryReader, VectorStoreIndex } from "llamaindex";

// 加载文档
const reader = new SimpleDirectoryReader();
const documents = await reader.loadData({ directoryPath: "./data" });`,
  },
  {
    title: '2. 构建索引',
    desc: '文档分块、向量化，构建可检索的向量索引',
    code: `// 构建索引（自动分块和向量化）
const index = await VectorStoreIndex.fromDocuments(documents);`,
  },
  {
    title: '3. 持久化存储',
    desc: '将索引保存到向量数据库，供长期使用',
    code: `// 持久化存储（可选）
// await index.storageContext.persist("./storage");`,
  },
  {
    title: '4. 查询生成',
    desc: '检索相关内容并生成回答',
    code: `// 创建查询引擎
const queryEngine = index.asQueryEngine();

// 提问并获取回答
const response = await queryEngine.query({
  query: "LlamaIndex 的主要功能是什么？",
});

console.log(response.toString());`,
  },
]

const activeStep = ref(0)

const currentCode = computed(() => {
  return highlight(steps[activeStep.value].code, 'typescript')
})
</script>

<template>
  <section
    class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16 h-full flex flex-col"
  >
    <div class="mb-8 text-center shrink-0">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
      >
        使用 LlamaIndex 构建 RAG
      </h2>
      <p class="mt-2 text-slate-600 max-w-2xl mx-auto">
        LlamaIndex 是专为 LLM 应用设计的数据框架，简化 RAG 构建流程
      </p>
    </div>

    <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-0">
      <!-- Left: Steps -->
      <div class="space-y-4 overflow-y-auto pr-2">
        <div
          v-for="(step, index) in steps"
          :key="index"
          @click="activeStep = index"
          class="p-5 rounded-2xl border transition-all duration-300 cursor-pointer"
          :class="[
            activeStep === index
              ? 'bg-white/90 border-accent/50 shadow-lg scale-[1.02]'
              : 'bg-white/40 border-white/30 hover:bg-white/60 hover:border-white/50',
          ]"
        >
          <h3
            class="text-lg font-bold mb-2"
            :class="activeStep === index ? 'text-accent' : 'text-slate-700'"
          >
            {{ step.title }}
          </h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            {{ step.desc }}
          </p>
        </div>
      </div>

      <!-- Right: Code -->
      <div
        class="relative rounded-2xl overflow-hidden bg-[#1e1e1e] shadow-2xl flex flex-col h-full min-h-[300px] text-slate-300"
      >
        <div
          class="flex items-center px-4 py-2 bg-[#252526] border-b border-[#3e3e42]"
        >
          <div class="flex gap-1.5">
            <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div class="ml-4 text-xs text-gray-400 font-mono">main.ts</div>
        </div>

        <div class="flex-1 overflow-auto p-6 custom-scrollbar">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <pre
            class="!bg-transparent !p-0 !m-0 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words"
          ><code v-html="currentCode"></code></pre>
        </div>

        <div
          class="absolute bottom-4 right-4 text-xs text-gray-500 font-mono bg-[#1e1e1e]/80 px-2 py-1 rounded"
        >
          LlamaIndex TypeScript
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #424242;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #4f4f4f;
}
</style>
