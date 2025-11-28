<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const strategies = [
  {
    id: 'data',
    title: '数据与索引优化 (Data & Indexing)',
    icon: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>',
    items: [
      {
        name: '更小的分块 (Small-to-Big)',
        desc: '检索时使用小块文本以提高精准度，但给 LLM 时提供其所属的更大父文档块，补充上下文。',
      },
      {
        name: '元数据过滤 (Metadata Filtering)',
        desc: '为文档添加时间、作者、类别等元数据，检索时先过滤，缩小范围，提高准确率。',
      },
      { name: '数据清洗', desc: '去除文档中的噪声（HTML 标签、页眉页脚、乱码），保证输入质量。' },
    ],
  },
  {
    id: 'retrieval',
    title: '检索策略优化 (Retrieval)',
    icon: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>',
    items: [
      {
        name: '混合检索 (Hybrid Search)',
        desc: '结合关键词搜索 (BM25) 和向量搜索 (Vector Search)。关键词擅长精确匹配（如人名、型号），向量擅长语义理解。',
      },
      {
        name: '查询重写 (Query Rewriting)',
        desc: 'LLM 将用户的模糊问题改写为更适合检索的形式，或分解为多个子问题。',
      },
      {
        name: '假设性文档嵌入 (HyDE)',
        desc: '先让 LLM 生成一个假设性答案，再用该答案去检索相似的真实文档。',
      },
    ],
  },
  {
    id: 'post-retrieval',
    title: '检索后处理 (Post-Retrieval)',
    icon: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>',
    items: [
      {
        name: '重排序 (Reranking)',
        desc: '使用专门的 Rerank 模型（如 Cohere Rerank, BGE-Reranker）对召回的 Top-K 结果进行精细排序，将最相关的排在最前。',
      },
      {
        name: '上下文压缩',
        desc: '仅提取检索文档中与问题相关的关键句子，减少无关信息对 LLM 的干扰。',
      },
    ],
  },
]

const activeStrategy = ref('data')
</script>

<template>
  <section
    class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16 h-full flex flex-col"
  >
    <div class="mb-8 text-center shrink-0">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
      >
        提升 RAG 准确性：高级优化策略
      </h2>
      <p class="mt-2 text-slate-600 max-w-2xl mx-auto">
        从单纯的“检索-生成”进化为更智能的系统，关键在于每一个环节的精细调优。
      </p>
    </div>

    <div class="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
      <!-- Sidebar Navigation -->
      <div class="lg:w-1/3 flex flex-col gap-3">
        <button
          v-for="strategy in strategies"
          :key="strategy.id"
          @click="activeStrategy = strategy.id"
          class="flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 border group"
          :class="[
            activeStrategy === strategy.id
              ? 'bg-white/90 border-accent/50 shadow-md translate-x-1'
              : 'bg-white/40 border-white/30 hover:bg-white/60 hover:border-white/50',
          ]"
        >
          <div
            class="p-2 rounded-lg transition-colors"
            :class="
              activeStrategy === strategy.id
                ? 'bg-accent/10 text-accent'
                : 'bg-slate-100 text-slate-500 group-hover:text-slate-700'
            "
            v-html="strategy.icon"
          ></div>
          <div>
            <div
              class="font-bold text-base"
              :class="activeStrategy === strategy.id ? 'text-slate-900' : 'text-slate-600'"
            >
              {{ strategy.title }}
            </div>
          </div>
        </button>
      </div>

      <!-- Content Area -->
      <div
        class="lg:w-2/3 bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 lg:p-8 shadow-xl flex flex-col justify-center"
      >
        <transition name="fade" mode="out-in">
          <div :key="activeStrategy" class="space-y-6">
            <div class="flex items-center gap-3 mb-6">
              <div
                class="p-2 rounded-lg bg-accent/10 text-accent"
                v-html="strategies.find((s) => s.id === activeStrategy)?.icon"
              ></div>
              <h3 class="text-2xl font-bold text-slate-800">
                {{ strategies.find((s) => s.id === activeStrategy)?.title }}
              </h3>
            </div>

            <div class="grid gap-4">
              <div
                v-for="(item, idx) in strategies.find((s) => s.id === activeStrategy)?.items"
                :key="idx"
                class="bg-white/80 rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 class="text-lg font-semibold text-accent mb-1 flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  {{ item.name }}
                </h4>
                <p class="text-slate-600 text-sm leading-relaxed pl-3.5">
                  {{ item.desc }}
                </p>
              </div>
            </div>

            <div
              class="mt-4 p-4 bg-yellow-50/80 border border-yellow-100 rounded-lg flex gap-3 text-sm text-yellow-800"
            >
              <svg
                class="w-5 h-5 shrink-0 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span v-if="activeStrategy === 'data'">
                数据质量是 RAG 的上限。如果源数据混乱或切分不当，后续模型再强也无法弥补 (Garbage In,
                Garbage Out)。
              </span>
              <span v-else-if="activeStrategy === 'retrieval'">
                检索优化的核心是弥补“语义匹配”的不足，让机器更懂用户的真实意图。
              </span>
              <span v-else>
                重排序 (Rerank) 通常是提升 RAG
                效果性价比最高的单一手段，虽然会增加少量延迟，但能显著提升 Top-1 准确率。
              </span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
