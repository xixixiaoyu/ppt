<script setup lang="ts">
import {
  CubeIcon,
  AdjustmentsHorizontalIcon,
  SparklesIcon,
  RocketLaunchIcon,
  LightBulbIcon,
} from '@heroicons/vue/24/outline'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const skillTree = [
  {
    icon: CubeIcon,
    title: '基础构建',
    color: 'indigo',
    skills: ['RAG 核心', '向量检索', '文档处理'],
  },
  {
    icon: AdjustmentsHorizontalIcon,
    title: '进阶优化',
    color: 'fuchsia',
    skills: ['Top-K & Rerank', '查询重写', '结构化索引'],
  },
  {
    icon: SparklesIcon,
    title: '高级扩展',
    color: 'emerald',
    skills: ['Agent & Tool-Use', '模型微调', '自动化评测'],
  },
  {
    icon: RocketLaunchIcon,
    title: '生产实践',
    color: 'sky',
    skills: ['模型部署', '成本与性能', '安全与合规'],
  },
]

const outlook = {
  icon: LightBulbIcon,
  title: '展望：未来已来，持续学习',
  description:
    '大模型技术日新月异，Agent、多模态、端侧模型等新范式层出不穷。今天的终点只是明天新的起点。保持好奇，不断探索，你将成为这场技术变革的引领者。',
}
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="text-center mb-10 max-w-4xl mx-auto">
      <h2
        class="text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 mb-4"
      >
        总结与展望
      </h2>
      <p class="text-xl text-slate-600 max-w-4xl mx-auto">
        我们已经走过了一段完整的旅程：从一个简单的问答机器人，到一个健壮、高效、安全的生产级大模型应用。
      </p>
    </div>

    <div class="mt-8 w-full max-w-6xl">
      <h3 class="text-3xl font-bold text-slate-800 mb-6 text-center">你的大模型应用开发技能树</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="category in skillTree"
          :key="category.title"
          class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6 flex flex-col items-center text-center h-full transition hover:-translate-y-0.5"
        >
          <component
            :is="category.icon"
            class="h-10 w-10 mb-3"
            :class="`text-${category.color}-500`"
          />
          <h4 class="text-xl font-bold mb-3 text-slate-800">
            {{ category.title }}
          </h4>
          <ul class="text-sm space-y-1.5 text-slate-600">
            <li v-for="skill in category.skills" :key="skill">{{ skill }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-10 w-full max-w-4xl">
      <div
        class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6 flex items-center gap-6 transition hover:-translate-y-0.5"
      >
        <LightBulbIcon class="h-16 w-16 text-amber-500 shrink-0" />
        <div class="text-left">
          <h3 class="text-2xl font-bold text-slate-800">{{ outlook.title }}</h3>
          <p class="mt-2 text-slate-600">{{ outlook.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
