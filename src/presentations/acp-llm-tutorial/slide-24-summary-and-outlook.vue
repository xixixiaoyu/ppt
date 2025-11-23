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
  <div
    class="slide-content p-12 flex flex-col justify-center items-center text-center h-full text-white"
  >
    <h2
      class="text-6xl font-black tracking-tight bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400 text-transparent bg-clip-text mb-4"
    >
      总结与展望
    </h2>
    <p class="text-xl text-white/70 max-w-4xl">
      我们已经走过了一段完整的旅程：从一个简单的问答机器人，到一个健壮、高效、安全的生产级大模型应用。
    </p>

    <div class="mt-10 w-full max-w-6xl">
      <h3 class="text-3xl font-bold text-white/90 mb-6">你的大模型应用开发技能树</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="category in skillTree"
          :key="category.title"
          class="bg-white/20 backdrop-blur-xl rounded-2xl p-6 border border-white/30 flex flex-col items-center text-center h-full"
        >
          <component
            :is="category.icon"
            class="h-10 w-10 mb-3"
            :class="`text-${category.color}-400`"
          />
          <h4 class="text-xl font-bold mb-3" :class="`text-${category.color}-300`">
            {{ category.title }}
          </h4>
          <ul class="text-sm space-y-1.5 text-white/70">
            <li v-for="skill in category.skills" :key="skill">{{ skill }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-10 w-full max-w-4xl">
      <div
        class="bg-white/20 backdrop-blur-xl rounded-3xl p-6 border border-white/30 flex items-center gap-6"
      >
        <LightBulbIcon class="h-16 w-16 text-amber-400 shrink-0" />
        <div class="text-left">
          <h3 class="text-2xl font-bold text-amber-300">{{ outlook.title }}</h3>
          <p class="mt-2 text-white/80">{{ outlook.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
