<script setup lang="ts">
import HeroBanner from '@/shared/ui/HeroBanner.vue'
import { computed, ref } from 'vue'

const props = defineProps<{ isActive?: boolean; isPreview?: boolean }>()

// Hero 类型配置
const heroTypes = [
  { id: 'standard', name: '标准封面', icon: '🎯' },
  { id: 'spotlight', name: '聚光灯', icon: '💡' },
  { id: 'minimal', name: '简约', icon: '✨' },
]

const activeHeroType = ref('standard')

// 获取当前类型的标题和描述
const currentInfo = computed(() => {
  const info = {
    standard: {
      title: '设计语言模板（示例）',
      subtitle: '多版式、可重用、含交互与 SVG 动效的中文演示模板',
      titleSize: '7xl' as const,
      palette: 'indigo-fuchsia-emerald' as const,
      effect: 'circles' as const,
    },
    spotlight: {
      title: '用关键字点亮叙事',
      subtitle: '突出核心概念，强化信息传递',
      titleSize: '6xl' as const,
      palette: 'indigo-fuchsia-emerald' as const,
      effect: 'circles' as const,
    },
    minimal: {
      title: '简洁即是力量',
      subtitle: '少即是多，专注核心信息',
      titleSize: '6xl' as const,
      palette: 'indigo-fuchsia-emerald' as const,
      effect: 'circles' as const,
    },
  }
  return info[activeHeroType.value as keyof typeof info]
})
</script>

<template>
  <section class="h-full w-full">
    <!-- Hero 类型选择器（仅在非预览模式下显示） -->
    <div v-if="!props.isPreview" class="absolute top-4 right-4 z-20">
      <div class="flex gap-2">
        <button
          v-for="type in heroTypes"
          :key="type.id"
          @click="activeHeroType = type.id"
          class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all bg-white/80 border border-white/40 text-slate-700 hover:bg-white/90"
          :class="activeHeroType === type.id ? 'ring-2 ring-accent' : ''"
        >
          <span>{{ type.icon }}</span>
          <span>{{ type.name }}</span>
        </button>
      </div>
    </div>

    <!-- 标准 Hero -->
    <HeroBanner
      v-if="activeHeroType === 'standard'"
      :effect="currentInfo.effect"
      :title="currentInfo.title"
      :subtitle="currentInfo.subtitle"
      :titleSize="currentInfo.titleSize"
      :palette="currentInfo.palette"
    >
      <template #actions>
        <button
          class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent px-6 py-3 text-white shadow-lg transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/50"
        >
          立即开始
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <span
          class="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur-md"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            class="opacity-70"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12h8M12 8v8" />
          </svg>
          示例模板，仅用于演示结构
        </span>
      </template>
    </HeroBanner>

    <!-- 聚光灯 Hero -->
    <section
      v-else-if="activeHeroType === 'spotlight'"
      class="h-full w-full flex items-center justify-center p-[clamp(2rem,5vw,6rem)] bg-[radial-gradient(circle_at_50%_30%,rgb(var(--accent)/0.08),transparent_55%)]"
    >
      <div class="text-center max-w-[960px]">
        <h2
          class="mx-auto text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[1.05] text-slate-900/90"
        >
          <span>用 </span>
          <span
            class="inline-block text-[1.2em] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
          >
            关键字
          </span>
          <span> 点亮叙事</span>
        </h2>
        <p class="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
          {{ currentInfo.subtitle }}
        </p>
      </div>
    </section>

    <!-- 简约 Hero -->
    <section
      v-else-if="activeHeroType === 'minimal'"
      class="h-full w-full flex items-center justify-center p-[clamp(2rem,5vw,6rem)]"
    >
      <div class="text-center max-w-4xl">
        <h1
          class="mx-auto text-[clamp(2.5rem,7vw,5rem)] font-light leading-tight text-slate-900"
        >
          {{ currentInfo.title }}
        </h1>
        <div
          class="mt-8 w-24 h-1 bg-gradient-to-r from-accent to-accent mx-auto rounded-full"
        ></div>
        <p class="mt-8 text-lg text-slate-600 max-w-xl mx-auto">
          {{ currentInfo.subtitle }}
        </p>
      </div>
    </section>
  </section>
</template>
