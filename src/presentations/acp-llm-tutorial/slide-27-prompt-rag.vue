<script setup lang='ts'>
import { DocumentTextIcon, LinkIcon, ShieldExclamationIcon } from '@heroicons/vue/24/solid'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const rules = [
  { icon: DocumentTextIcon, title: '只用提供的上下文', description: '若不足以回答则说明不足, 不编造' },
  { icon: LinkIcon, title: '引用来源', description: '返回命中文档的标识与片段位置' },
  { icon: ShieldExclamationIcon, title: '输出受控', description: '结构化返回答案、依据与信心分数' }
]

const ragPrompt = `角色: 你是知识库问答助手
任务: 基于上下文准确回答问题
上下文: <检索到的文档片段>
约束: 只使用上下文, 不得引入外部知识
输出(JSON): {
  "answer": "...",
  "citations": [{ "doc_id": "...", "span": "start-end" }],
  "confidence": 0.0,
  "notice": "若上下文不足, 说明无法回答并指出缺失信息"
}`
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8">
      <h2 class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70">
        RAG 专用提示词：引用与约束
      </h2>
      <p class="mt-2 text-slate-600 max-w-3xl">让回答紧扣检索结果，确保可追溯、可审计与可落地。</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
      <div class="lg:col-span-2 bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6">
        <h3 class="text-xl font-bold text-slate-900 mb-4">关键规则</h3>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li v-for="r in rules" :key="r.title" class="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
            <div class="bg-emerald-100 p-2 rounded-xl border border-emerald-200/80">
              <component :is="r.icon" class="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h4 class="font-semibold text-slate-900">{{ r.title }}</h4>
              <p class="text-slate-600 text-sm">{{ r.description }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="bg-slate-900/80 text-slate-100 rounded-3xl border border-white/10 shadow-xl p-6">
        <h3 class="text-xl font-bold text-slate-100 mb-4">Prompt 模板</h3>
        <pre class="font-mono text-sm whitespace-pre-wrap"><code>{{ ragPrompt }}</code></pre>
      </div>
    </div>
  </section>
</template>

