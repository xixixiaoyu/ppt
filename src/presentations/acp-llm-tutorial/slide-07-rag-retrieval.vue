<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const code = `// 1. 加载索引
const storageContext = await llamaindex.storageContextFromDefaults({
  persistPath: './knowledge_base/test'
})
const index = await llamaindex.VectorStoreIndex.init({ storageContext, embedModel })

// 2. 创建查询引擎
const queryEngine = index.asQueryEngine()

// 3. 执行查询
const { response, sourceNodes } = await queryEngine.query({
  query: '我们公司项目管理应该用什么工具？'
})

// 4. 获取答案和来源
console.log('答案：', response)
console.log('来源：', sourceNodes.map(n => n.metadata.filePath))`

const interpretations = [
  {
    term: '加载索引',
    description: '从之前持久化的路径加载索引，避免了重复计算，可以直接进入问答环节。'
  },
  {
    term: '创建查询引擎',
    description: '<code>asQueryEngine</code> 是一个高级 API，它封装了“问题向量化”、“相似度检索”和“构建提示词”等复杂步骤。'
  },
  {
    term: '执行查询',
    description: '调用 <code>query</code> 方法，输入用户的问题。引擎会自动在向量数据库中寻找最相关的知识，并将其与问题一起发送给大模型。'
  },
  {
    term: '获取结果',
    description: '返回的结果中，<code>response</code> 是大模型生成的最终答案，<code>sourceNodes</code> 则是本次回答所参考的原始文档片段，便于溯源和验证。'
  }
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8 text-center">
      <h2 class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400">
        RAG 实践：检索与生成
      </h2>
      <p class="mt-2 text-slate-600 max-w-2xl mx-auto">加载索引，创建查询引擎，让大模型依据外部知识回答问题。</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-slate-900/80 text-slate-100 rounded-2xl border border-white/10 p-6 font-mono text-sm leading-relaxed">
        <pre><code>{{ code }}</code></pre>
      </div>
      <div class="space-y-4">
        <div v-for="(item, i) in interpretations" :key="i" class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-2xl p-5">
          <h3 class="font-bold text-slate-900">{{ i + 1 }}. {{ item.term }}</h3>
          <p class="mt-1 text-slate-700 text-sm" v-html="item.description"></p>
        </div>
      </div>
    </div>
  </section>
</template>
