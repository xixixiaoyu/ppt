<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const beforePoints = [
  '信息分散，难以扫读',
  '视觉层级不清晰',
  '缺少关键指标展示'
]

const afterPoints = [
  '卡片化呈现，便于扫读',
  '统一渐变与排版，层次清晰',
  '关键指标与结论直观可见'
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8 text-center">
      <h2 class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400">
        优化前后（占位）
      </h2>
      <p class="mt-2 text-slate-600">用于展示改版效果与价值对比。</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="rounded-3xl border border-rose-300/40 bg-white/70 backdrop-blur-md shadow-xl p-6">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold text-rose-700">优化前</h3>
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700">需要改进</span>
        </div>
        <ul class="mt-4 space-y-2 text-slate-700 text-sm">
          <li v-for="p in beforePoints" :key="p" class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-rose-400"></span>
            {{ p }}
          </li>
        </ul>
      </div>

      <div class="rounded-3xl border border-emerald-300/40 bg-white/70 backdrop-blur-md shadow-xl p-6">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold text-emerald-700">优化后</h3>
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">效果显著</span>
        </div>
        <ul class="mt-4 space-y-2 text-slate-700 text-sm">
          <li v-for="p in afterPoints" :key="p" class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            {{ p }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
