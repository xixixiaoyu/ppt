<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const challenges = [
  {
    title: '切片过大 (Too Large)',
    description: '噪声多，稀释核心，干扰判断。',
  },
  {
    title: '切片过小 (Too Small)',
    description: '上下文不完整，难以理解。',
  },
]

const solutions = [
  {
    title: '语义切分 (Semantic Chunking)',
    description: '<strong>是什么:</strong> 基于 NLP 模型识别句子边界或语义主题来切分文档，比固定长度切分更能保持语义完整性。在 LlamaIndex 中可通过 <code>SemanticSplitterNodeParser</code> 实现。<br><strong>适用场景:</strong> 适用于段落结构清晰、语义连贯的文档，如文章、报告等。'
  },
  {
    title: '重叠切块 (Overlap)',
    description: '<strong>是什么:</strong> 在相邻的块之间设置重叠区域 (e.g., <code>chunkOverlap: 50</code>)，确保句子或段落的连续性不被硬性切断。<br><strong>适用场景:</strong> 几乎是所有切分策略的“标配”，能有效缓解边界效应，是简单又高效的优化。'
  },
  {
    title: '句窗检索 (Sentence Window)',
    description: '<strong>是什么:</strong> 检索时以单个句子为单位，但将其周围的句子（“窗口”）一同提供给 LLM 作为上下文。这实现了检索的精确性和上下文的完整性之间的平衡。<br><strong>适用场景:</strong> 当需要对非常具体的事实进行问答时，此方法能精确定位，同时补充必要的背景信息。'
  },
  {
    title: '自动合并检索 (Auto-merging)',
    description: '<strong>是什么:</strong> 先检索小粒度的子文档，然后追溯其父文档，将多个相关的子文档合并成一个更大的、信息更完整的上下文。<br><strong>适用场景:</strong> 适用于具有层级结构（如书、章节、段落）的文档，能有效避免信息碎片化。'
  },
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="text-center mb-8">
      <h2 class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70">优化策略（三）：精细化文档切片</h2>
      <p class="mt-2 text-lg text-slate-600 max-w-2xl mx-auto">切片的质量，直接决定了模型能拿到多高质量的“参考资料”。</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Challenges -->
      <div class="bg-white/70 backdrop-blur-md p-6 border border-slate-200/30 rounded-3xl shadow-xl">
        <h3 class="text-xl font-bold text-slate-800 mb-4">挑战：不合适的切片尺寸</h3>
        <ul class="space-y-4">
          <li v-for="(item, i) in challenges" :key="i" class="flex items-start gap-3">
            <span class="text-red-500 text-lg mt-1">❌</span>
            <div>
              <h4 class="font-semibold text-slate-900">{{ item.title }}</h4>
              <p class="text-slate-600 text-sm">{{ item.description }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Solutions -->
      <div class="bg-white/70 backdrop-blur-md p-6 border border-emerald-500/50 rounded-3xl shadow-xl">
        <h3 class="text-xl font-bold text-emerald-800 mb-4">对策：智能切片策略</h3>
        <ul class="space-y-4">
          <li v-for="(item, i) in solutions" :key="i" class="flex items-start gap-3">
            <span class="text-green-500 text-lg mt-1">✅</span>
            <div>
              <h4 class="font-semibold text-slate-900">{{ item.title }}</h4>
              <p class="text-slate-600 text-sm">{{ item.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-6 text-center">
      <p
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-slate-200/30 backdrop-blur-md text-slate-700 text-sm"
      >
        💡 经验法则：从 <code>SemanticSplitterNodeParser</code> + 合理的 <code>chunkOverlap</code> (10-20%) 开始，它能解决 80% 的问题。
      </p>
    </div>
  </section>
</template>
