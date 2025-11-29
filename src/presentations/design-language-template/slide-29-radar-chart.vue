<script setup lang="ts">
import { ref } from 'vue'
import { VChart } from '@/shared/charts/echarts'
import type { EChartsOption } from '@/shared/charts/echarts'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const option = ref<EChartsOption>({
  title: { text: '能力雷达图', left: 'center' },
  tooltip: {},
  legend: { top: 36 },
  radar: {
    indicator: [
      { name: '稳定性', max: 100 },
      { name: '性能', max: 100 },
      { name: '易用性', max: 100 },
      { name: '扩展性', max: 100 },
      { name: '安全性', max: 100 },
    ],
  },
  series: [
    {
      name: '方案对比',
      type: 'radar',
      data: [
        { value: [80, 76, 88, 72, 85], name: '示例策略' },
        { value: [72, 70, 78, 68, 80], name: '对照方案' },
      ],
    },
  ],
})
</script>

<template>
  <section class="h-full w-full grid place-items-center p-6">
    <div
      class="w-full max-w-5xl rounded-3xl p-6 bg-white/70 border border-slate-200/30 backdrop-blur-xl shadow-xl"
    >
      <h2
        class="m-0 text-2xl font-extrabold tracking-tight text-slate-800 text-center"
      >
        能力雷达图
      </h2>
      <p class="mt-2 text-center text-slate-600">展示多维指标的综合表现。</p>
      <VChart class="mt-6 h-[60vh] w-full" :option="option" autoresize />
    </div>
  </section>
</template>
