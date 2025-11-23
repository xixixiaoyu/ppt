<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const code = `// 示例：构建索引并查询
export async function demo() {
  const index = await buildIndex(docs)
  const engine = index.asQueryEngine({ similarity_top_k: 5 })
  const answer = await engine.query('示例问题')
  return answer
}`

const highlights = [
  '结构清晰：索引构建 → 查询引擎 → 提问',
  '参数可调：如 similarity_top_k 展示检索范围',
  '讲解友好：适合技术分享中的代码走读',
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400"
      >
        代码展示（占位）
      </h2>
      <p class="mt-2 text-slate-600">用于技术分享与架构评审，突出关键片段与要点。</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        class="bg-slate-900/80 text-slate-100 rounded-2xl border border-white/10 p-6 font-mono text-sm leading-relaxed"
      >
        <pre><code>{{ code }}</code></pre>
      </div>
      <div class="space-y-4">
        <div
          v-for="(h, i) in highlights"
          :key="i"
          class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-2xl p-5"
        >
          <h3 class="font-bold text-slate-900">要点 {{ i + 1 }}</h3>
          <p class="mt-1 text-slate-700 text-sm">{{ h }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
