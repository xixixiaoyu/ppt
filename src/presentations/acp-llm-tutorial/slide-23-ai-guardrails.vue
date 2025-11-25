<script setup lang="ts">
import {
  ShieldExclamationIcon,
  EyeSlashIcon,
  WrenchIcon,
  ShieldCheckIcon,
  CubeTransparentIcon,
  BoltIcon,
  CogIcon,
} from '@heroicons/vue/24/outline'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const legacyMethod = {
  icon: ShieldExclamationIcon,
  title: '为什么简单的关键词过滤不够？',
  color: 'slate',
  points: [
    {
      icon: EyeSlashIcon,
      title: '易被绕过',
      description: '同音、拆字、变体等轻松绕过。',
    },
    {
      icon: CubeTransparentIcon,
      title: '缺乏语境',
      description: '无法理解上下文，误判与漏判频发。',
    },
    {
      icon: WrenchIcon,
      title: '维护困难',
      description: '风险词库需持续更新，成本高。',
    },
  ],
}

const modernMethod = {
  icon: ShieldCheckIcon,
  title: 'AI Guardrails：智能安全网关',
  color: 'indigo',
  description:
    '独立安全服务：请求前/响应后双向审查，体系化防护。',
  points: [
    {
      icon: CubeTransparentIcon,
      title: '多模态检测',
      description: '支持文本、图片、音频、视频等多种内容形态的合规性审查。',
    },
    {
      icon: BoltIcon,
      title: '长文本/流式处理',
      description: '专为 LLM 场景优化，支持对长对话和流式输出进行实时、高效的检测。',
    },
    {
      icon: CogIcon,
      title: '可定制策略',
      description: '按场景自定义词库与规则，灵活管控。',
    },
  ],
}

const integration = [
  '前置检测：用户输入先过安全网关',
  '后置检测：模型输出再检合规策略',
  '策略管理：维护风险词库与场景规则',
  '反馈闭环：拦截结果与原因回传前端',
  '审计留痕：保存检测记录用于复盘'
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="text-center mb-10 max-w-4xl mx-auto">
      <h2 class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70">安全篇：AI 内容安全 (AI Guardrails)</h2>
      <p class="text-lg text-slate-600 mt-3">为你的大模型应用构建专业的、可扩展的安全护城河。</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
      <!-- Legacy Method Card -->
      <div
        class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6 flex flex-col h-full transition hover:-translate-y-0.5"
      >
        <div class="flex items-center gap-3 mb-4">
          <component :is="legacyMethod.icon" class="h-8 w-8 text-slate-400" />
          <h3 class="text-2xl font-bold text-slate-700">
            {{ legacyMethod.title }}
          </h3>
        </div>
        <ul class="space-y-4">
          <li
            v-for="point in legacyMethod.points"
            :key="point.title"
            class="flex items-start gap-3"
          >
            <component :is="point.icon" class="h-6 w-6 text-slate-400 shrink-0 mt-1" />
            <div>
              <h4 class="font-semibold text-slate-800">{{ point.title }}</h4>
              <p class="text-slate-600 text-sm">{{ point.description }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Modern Method Card (Highlighted) -->
      <div
        class="bg-white/70 backdrop-blur-md ring-2 ring-indigo-500/50 rounded-3xl shadow-xl p-6 flex flex-col h-full transition hover:-translate-y-0.5"
      >
        <div class="flex items-center gap-3 mb-4">
          <component :is="modernMethod.icon" class="h-8 w-8 text-indigo-500" />
          <h3 class="text-2xl font-bold text-indigo-800">
            {{ modernMethod.title }}
          </h3>
        </div>
        <p class="text-slate-600 mb-4 text-sm">{{ modernMethod.description }}</p>
        <ul class="space-y-4">
          <li
            v-for="point in modernMethod.points"
            :key="point.title"
            class="flex items-start gap-3"
          >
            <component :is="point.icon" class="h-6 w-6 text-indigo-500 shrink-0 mt-1" />
            <div>
              <h4 class="font-semibold text-slate-800">{{ point.title }}</h4>
              <p class="text-slate-600 text-sm">{{ point.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="mt-8 w-full max-w-6xl">
      <div class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6">
        <h3 class="text-xl font-bold text-slate-800 mb-3">集成步骤</h3>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-700">
          <li v-for="it in integration" :key="it" class="flex items-start gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-indigo-500"><path d="M20 6L9 17l-5-5"/></svg>
            <span>{{ it }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
