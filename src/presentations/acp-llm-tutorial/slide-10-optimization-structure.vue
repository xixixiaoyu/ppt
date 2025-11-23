<template>
  <div class="slide-content p-8">
    <h2 class="text-4xl font-bold mb-6">优化策略 (二)：优化文档结构 (Markdown)</h2>
    <p class="text-lg text-slate-600 mb-8">
      为非结构化文本添加 Markdown 格式，可以显著提升模型对文档层次和关键信息的理解能力。
    </p>
    <div class="grid grid-cols-2 gap-8">
      <div>
        <h3 class="text-2xl font-semibold mb-4 text-slate-800">原始数据 (Before)</h3>
        <div class="code-block text-sm p-4 rounded-xl bg-slate-100 border">
          <pre><code>LlamaIndex 官方文档

简介
LlamaIndex 是一个...

核心概念
- Node: 数据单元
- Index: 节点集合</code></pre>
        </div>
      </div>
      <div>
        <h3 class="text-2xl font-semibold mb-4 text-slate-800">结构化后 (After)</h3>
        <div class="code-block text-sm p-4 rounded-xl bg-slate-100 border">
          <pre><code>## LlamaIndex 官方文档

### 简介
LlamaIndex 是一个...

### 核心概念
- **Node**: 数据单元
- **Index**: 节点集合</code></pre>
        </div>
      </div>
    </div>
    <div class="mt-8 p-6 bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl">
      <h3 class="text-2xl font-bold mb-4 text-indigo-600">解读：结构即上下文</h3>
      <ul class="list-disc list-inside space-y-2 text-lg text-slate-700">
        <li>
          <b>明确层次</b>: Markdown 的标题 (<code>#</code>, <code>##</code>)
          帮助模型区分章节和段落，理解内容的主次关系。
        </li>
        <li><b>突出重点</b>: 粗体、斜体和列表等元素能让模型注意到关键术语和并列关系。</li>
        <li>
          <b>提升精度</b>:
          模型在生成答案时，可以更准确地引用到具体的章节标题，使答案来源更清晰，减少“捏造”事实的可能性。
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.slide-content {
  @apply flex flex-col justify-center h-full;
}
.code-block {
  @apply bg-slate-900/80 text-slate-100 rounded-2xl border border-white/10 p-6;
}
</style>
