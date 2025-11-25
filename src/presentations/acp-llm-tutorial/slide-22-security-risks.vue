<script setup lang="ts">
import { BeakerIcon, ExclamationTriangleIcon, LockOpenIcon } from '@heroicons/vue/24/outline'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const problem = {
  title: '传统安全边界的失效',
  description:
    '自然语言接口易受“社工”攻击；传统防护难应对语义挑战。',
  points: [
    '输入开放性：用户可以输入任何内容，增加了攻击面。',
    '输出不确定性：模型的生成内容难以预测，可能产生有害信息。',
    '语义复杂性：攻击者可以利用语言的微妙之处绕过简单规则。',
  ],
}

const threats = [
  {
    icon: BeakerIcon,
    title: '提示注入 (Prompt Injection)',
    description: '精心输入劫持意图，诱导执行或泄露敏感。',
  },
  {
    icon: ExclamationTriangleIcon,
    title: '不当内容生成',
    description: '诱导下生成不当内容，存在合规风险。',
  },
  {
    icon: LockOpenIcon,
    title: '数据与隐私泄露',
    description: '可能泄露训练数据中的个人信息与机密。',
  },
]

const defenses = [
  '输入侧：提示词模板与输入清洗，限制敏感意图',
  '输出侧：内容安全检测与拦截，分级处理',
  '隔离：工具调用最小权限原则，关键操作需确认',
  '审计：全链路日志与回溯，便于事后排查',
  '数据：脱敏与访问控制，避免隐私泄露',
  '人机协同：高风险场景引入人工复核'
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="text-center mb-8 max-w-4xl mx-auto">
      <h2 class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70">安全篇：大模型应用的安全风险</h2>
      <p class="text-lg text-slate-600 mt-3">
        当模型对外开放时，新的挑战浮出水面：如何防范恶意使用和内容风险？
      </p>
    </div>

    <div
      class="w-full max-w-5xl bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-8 mb-8 transition hover:-translate-y-0.5 mx-auto"
    >
      <h3 class="text-2xl font-bold text-center text-slate-800 mb-4">{{ problem.title }}</h3>
      <p class="text-center text-slate-600 mb-6 max-w-3xl mx-auto">{{ problem.description }}</p>
      <ul class="flex justify-center gap-4 text-center flex-wrap">
        <li
          v-for="point in problem.points"
          :key="point"
          class="bg-rose-100/80 border border-rose-200/50 rounded-full px-4 py-1.5 text-sm"
        >
          <span class="font-semibold text-rose-700">{{ point.split('：')[0] }}</span>
          <span class="text-slate-700/90">：{{ point.split('：')[1] }}</span>
        </li>
      </ul>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
      <div
        v-for="threat in threats"
        :key="threat.title"
        class="flex flex-col bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6 text-center items-center transition hover:-translate-y-0.5"
      >
        <div class="flex justify-center mb-4">
          <component :is="threat.icon" class="h-10 w-10 text-rose-500" />
        </div>
        <h3 class="text-xl font-bold text-slate-800">{{ threat.title }}</h3>
        <p class="text-slate-600 mt-2 flex-grow text-sm">{{ threat.description }}</p>
      </div>
    </div>
    <div class="mt-8 w-full max-w-7xl mx-auto">
      <div class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6">
        <h3 class="text-xl font-bold text-slate-800 mb-3">防护清单</h3>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-700">
          <li v-for="it in defenses" :key="it" class="flex items-start gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-500"><path d="M20 6L9 17l-5-5"/></svg>
            <span>{{ it }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
