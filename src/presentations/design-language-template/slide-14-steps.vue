<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const steps = [
  { title: '需求梳理', description: '明确目标与范围' },
  { title: '方案设计', description: '确定版式与数据' },
  { title: '实现与联调', description: '完成开发与联动' },
  { title: '评审与完善', description: '打磨体验与细节' },
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8 text-center">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400"
      >
        步骤流程（占位）
      </h2>
      <p class="mt-2 text-slate-600 max-w-2xl mx-auto">用于表达端到端方法论与工作流。</p>
    </div>

    <div class="hidden md:flex items-center justify-center gap-4">
      <template v-for="(s, i) in steps" :key="s.title">
        <div
          class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-2xl shadow-lg p-6 text-center w-56"
        >
          <div
            class="mx-auto grid place-items-center w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-bold mb-3"
          >
            {{ i + 1 }}
          </div>
          <h3 class="text-lg font-bold text-slate-900">{{ s.title }}</h3>
          <p class="text-slate-700 text-sm mt-1">{{ s.description }}</p>
        </div>
        <div v-if="i < steps.length - 1" class="text-slate-500">→</div>
      </template>
    </div>

    <div class="md:hidden space-y-4">
      <template v-for="(s, i) in steps" :key="s.title">
        <div
          class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-2xl shadow-lg p-5"
        >
          <div class="flex items-center gap-3">
            <div
              class="grid place-items-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-bold"
            >
              {{ i + 1 }}
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-900">{{ s.title }}</h3>
              <p class="text-slate-700 text-sm">{{ s.description }}</p>
            </div>
          </div>
        </div>
        <div v-if="i < steps.length - 1" class="text-center text-slate-400">↓</div>
      </template>
    </div>
  </section>
</template>
