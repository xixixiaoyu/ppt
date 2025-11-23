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
  color: 'amber',
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
  color: 'sky',
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
  <div class="slide-content p-12 flex flex-col justify-center items-center h-full text-white">
    <h2 class="text-4xl font-bold mb-2 text-white/90">安全篇：AI 内容安全 (AI Guardrails)</h2>
    <p class="text-lg text-white/70 mb-10">为你的大模型应用构建专业的、可扩展的安全护城河。</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
      <!-- Legacy Method Card -->
      <div
        class="bg-white/20 backdrop-blur-xl rounded-2xl p-6 border border-white/30 flex flex-col h-full"
      >
        <div class="flex items-center gap-3 mb-4">
          <component
            :is="legacyMethod.icon"
            class="h-8 w-8"
            :class="`text-${legacyMethod.color}-400`"
          />
          <h3 class="text-2xl font-bold" :class="`text-${legacyMethod.color}-300`">
            {{ legacyMethod.title }}
          </h3>
        </div>
        <ul class="space-y-4">
          <li
            v-for="point in legacyMethod.points"
            :key="point.title"
            class="flex items-start gap-3"
          >
            <component :is="point.icon" class="h-6 w-6 text-amber-400 shrink-0 mt-1" />
            <div>
              <h4 class="font-semibold text-white/90">{{ point.title }}</h4>
              <p class="text-white/70 text-sm">{{ point.description }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Modern Method Card (Highlighted) -->
      <div class="bg-gradient-to-br from-sky-500 to-indigo-600 p-1 rounded-3xl shadow-2xl h-full">
        <div class="bg-slate-800/80 backdrop-blur-2xl rounded-2xl p-6 h-full flex flex-col">
          <div class="flex items-center gap-3 mb-4">
            <component
              :is="modernMethod.icon"
              class="h-8 w-8"
              :class="`text-${modernMethod.color}-400`"
            />
            <h3 class="text-2xl font-bold" :class="`text-${modernMethod.color}-300`">
              {{ modernMethod.title }}
            </h3>
          </div>
          <p class="text-white/70 mb-4 text-sm">{{ modernMethod.description }}</p>
          <ul class="space-y-4">
            <li
              v-for="point in modernMethod.points"
              :key="point.title"
              class="flex items-start gap-3"
            >
              <component :is="point.icon" class="h-6 w-6 text-sky-400 shrink-0 mt-1" />
              <div>
                <h4 class="font-semibold text-white/90">{{ point.title }}</h4>
                <p class="text-white/70 text-sm">{{ point.description }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
