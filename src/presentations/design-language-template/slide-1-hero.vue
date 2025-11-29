<script setup lang="ts">
import HeroBanner from '@/shared/ui/HeroBanner.vue'
defineProps<{ isActive?: boolean; isPreview?: boolean }>()
</script>

<template>
  <HeroBanner
    effect="circles"
    :title="'设计语言模板（示例)'"
    :subtitle="'多版式、可重用、含交互与 SVG 动效的中文演示模板'"
    :titleSize="'7xl'"
    palette="indigo-fuchsia-emerald"
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
</template>
