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
      description: '攻击者可用同音字、拆字、变体字等方式轻松绕过。',
    },
    {
      icon: CubeTransparentIcon,
      title: '缺乏语境',
      description: '无法理解上下文，容易误判和漏判 (例如，“苹果”是水果还是公司？)。',
    },
    {
      icon: WrenchIcon,
      title: '维护困难',
      description: '风险词库需要持续、专业地更新，成本高昂。',
    },
  ],
}

const modernMethod = {
  icon: ShieldCheckIcon,
  title: 'AI Guardrails：智能安全网关',
  color: 'indigo',
  description:
    '它是一个独立于大模型的安全服务，在请求送达模型前和模型返回结果后进行双向审查，提供体系化的防护能力。',
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
      description: '允许用户根据业务场景，自定义风险词库和拦截规则，实现灵活管控。',
    },
  ],
}
</script>

<template>
  <div class="h-full w-full flex flex-col justify-center items-center p-8 bg-white">
    <div class="text-center mb-10 max-w-4xl">
      <h2
        class="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-sky-500"
      >
        安全篇：AI 内容安全 (AI Guardrails)
      </h2>
      <p class="text-lg text-slate-600 mt-3">为你的大模型应用构建专业的、可扩展的安全护城河。</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
      <!-- Legacy Method Card -->
      <div class="bg-white/60 backdrop-blur-sm ring-1 ring-slate-200/50 rounded-2xl shadow-lg p-6 flex flex-col h-full">
        <div class="flex items-center gap-3 mb-4">
          <component :is="legacyMethod.icon" class="h-8 w-8 text-slate-400" />
          <h3 class="text-2xl font-bold text-slate-700">
            {{ legacyMethod.title }}
          </h3>
        </div>
        <ul class="space-y-4">
          <li v-for="point in legacyMethod.points" :key="point.title" class="flex items-start gap-3">
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
        class="bg-white/60 backdrop-blur-sm ring-2 ring-indigo-500/50 rounded-2xl shadow-xl p-6 flex flex-col h-full"
      >
        <div class="flex items-center gap-3 mb-4">
          <component :is="modernMethod.icon" class="h-8 w-8 text-indigo-500" />
          <h3 class="text-2xl font-bold text-indigo-800">
            {{ modernMethod.title }}
          </h3>
        </div>
        <p class="text-slate-600 mb-4 text-sm">{{ modernMethod.description }}</p>
        <ul class="space-y-4">
          <li v-for="point in modernMethod.points" :key="point.title" class="flex items-start gap-3">
            <component :is="point.icon" class="h-6 w-6 text-indigo-500 shrink-0 mt-1" />
            <div>
              <h4 class="font-semibold text-slate-800">{{ point.title }}</h4>
              <p class="text-slate-600 text-sm">{{ point.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
