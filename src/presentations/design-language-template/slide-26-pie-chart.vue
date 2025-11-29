<script setup lang="ts">
import { ref } from 'vue'
import { VChart } from '@/shared/charts/echarts'
import type { EChartsOption } from '@/shared/charts/echarts'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const option = ref<EChartsOption>({
  title: { text: '构成饼图', left: 'center' },
  tooltip: { trigger: 'item' },
  legend: { bottom: 0 },
  series: [
    {
      name: '来源构成',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: [
        { value: 335, name: 'Direct' },
        { value: 310, name: 'Email' },
        { value: 234, name: 'Ad' },
        { value: 135, name: 'Video' },
        { value: 1548, name: 'Search' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0,0,0,0.3)',
        },
      },
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
        构成饼图
      </h2>
      <p class="mt-2 text-center text-slate-600">展示各类来源占比。</p>
      <VChart class="mt-6 h-[60vh] w-full" :option="option" autoresize />
    </div>
  </section>
</template>
