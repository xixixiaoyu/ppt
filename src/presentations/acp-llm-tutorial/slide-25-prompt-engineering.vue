<script setup lang="ts">
import { LightBulbIcon, ShieldCheckIcon, ClipboardDocumentCheckIcon } from '@heroicons/vue/24/solid'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const goals = [
  { icon: LightBulbIcon, title: '对齐意图', description: '让模型准确理解任务与评价标准' },
  { icon: ShieldCheckIcon, title: '降低风险', description: '减少幻觉、越权和不当输出' },
  {
    icon: ClipboardDocumentCheckIcon,
    title: '增强可控',
    description: '稳定结构化输出，便于程序消费',
  },
]

const principles = [
  '明确角色与任务边界',
  '提供必要上下文而非冗余信息',
  '约束输出格式与字段含义',
  '分步思考并暴露中间过程',
  '失败时给出原因与补救建议',
]

const skeleton = `角色: 你是资深领域专家
任务: 按规范回答用户问题
输入: 用户问题与相关上下文
约束: 只使用提供的上下文, 不编造
输出格式: JSON
{
  "answer": "...",
  "steps": ["...", "..."],
  "confidence": 0.0
}`
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
      >
        提示词工程：目标与原则
      </h2>
      <p class="mt-2 text-slate-600 max-w-3xl">
        用工程化方法设计 Prompt，使输出可靠、可解析、可迭代。
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
      <div class="lg:col-span-2 space-y-6">
        <div
          class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6"
        >
          <h3 class="text-xl font-bold text-slate-900 mb-4">核心目标</h3>
          <ul class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <li
              v-for="g in goals"
              :key="g.title"
              class="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/60"
            >
              <div class="bg-indigo-100 p-2 rounded-xl border border-indigo-200/80">
                <component :is="g.icon" class="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h4 class="font-semibold text-slate-900">{{ g.title }}</h4>
                <p class="text-slate-600 text-sm">{{ g.description }}</p>
              </div>
            </li>
          </ul>
        </div>

        <div
          class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6"
        >
          <h3 class="text-xl font-bold text-slate-900 mb-4">设计原则</h3>
          <ul class="space-y-3 text-slate-700 text-sm">
            <li v-for="p in principles" :key="p" class="flex items-start gap-3">
              <svg
                class="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>{{ p }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="bg-slate-900/80 text-slate-100 rounded-3xl border border-white/10 shadow-xl p-6">
        <h3 class="text-xl font-bold text-slate-100 mb-4">Prompt 骨架示例</h3>
        <pre class="font-mono text-sm whitespace-pre-wrap"><code>{{ skeleton }}</code></pre>
      </div>
    </div>
  </section>
</template>
