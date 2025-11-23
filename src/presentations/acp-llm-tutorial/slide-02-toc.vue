<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const items = [
  { title: '背景', note: '为什么需要答疑机器人？' },
  { title: '核心', note: 'RAG - 扩展大模型的知识' },
  { title: '优化', note: '提升回答质量与准确度' },
  { title: '进阶', note: '构建 Agent 完成复杂任务' },
  { title: '提效', note: '模型微调与自动化评测' },
  { title: '上线', note: '模型部署与生产实践' },
  { title: '安全', note: '大模型应用的安全合规' },
  { title: '总结', note: '总结与展望' },
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8">
      <h2 class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400">
        议程概览
      </h2>
      <p class="mt-2 text-slate-600">我们将系统性地探讨构建生产级问答系统的全过程。</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <article v-for="(item, idx) in items" :key="idx" class="group bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6 transition hover:-translate-y-0.5 hover:shadow-2xl">
        <div class="flex items-start justify-between">
          <h3 class="text-lg font-bold text-slate-900">{{ item.title }}</h3>
          <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500/20 to-emerald-400/20 border border-white/40 text-slate-900 font-mono text-sm">{{ idx + 1 }}</span>
        </div>
        <p class="mt-2 text-sm text-slate-600">{{ item.note }}</p>
      </article>
    </div>
  </section>
</template>
