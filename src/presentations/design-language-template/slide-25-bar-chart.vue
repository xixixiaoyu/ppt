<script setup lang="ts">
import { ref } from 'vue'
import { VChart } from '@/shared/charts/echarts'
import type { EChartsOption } from '@/shared/charts/echarts'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const option = ref<EChartsOption>({
  title: { text: '对比柱状图', left: 'center' },
  tooltip: { trigger: 'axis' },
  legend: { top: 36 },
  grid: { left: 40, right: 20, bottom: 40, top: 80 },
  xAxis: {
    type: 'category',
    data: ['阶段 A', '阶段 B', '阶段 C', '阶段 D', '阶段 E'],
  },
  yAxis: { type: 'value' },
  series: [
    {
      name: '示例策略',
      type: 'bar',
      data: [40, 52, 58, 64, 70],
      itemStyle: { borderRadius: [6, 6, 0, 0] },
    },
    {
      name: '对照方案',
      type: 'bar',
      data: [28, 36, 44, 53, 60],
      itemStyle: { borderRadius: [6, 6, 0, 0] },
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
        对比柱状图
      </h2>
      <p class="mt-2 text-center text-slate-600">显示两组方案的体量对比。</p>
      <VChart class="mt-6 h-[60vh] w-full" :option="option" autoresize />
    </div>
  </section>
</template>
