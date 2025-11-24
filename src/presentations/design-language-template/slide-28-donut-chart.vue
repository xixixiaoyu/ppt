<script setup lang="ts">
import { ref } from 'vue'
import { VChart } from '@/shared/charts/echarts'
import type { EChartsOption } from '@/shared/charts/echarts'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const option = ref<EChartsOption>({
  title: { text: '环形图', left: 'center' },
  tooltip: { trigger: 'item' },
  legend: { bottom: 0 },
  series: [
    {
      name: '占比',
      type: 'pie',
      radius: ['40%', '65%'],
      center: ['50%', '50%'],
      label: { show: false },
      labelLine: { show: false },
      data: [
        { value: 120, name: 'A' },
        { value: 90, name: 'B' },
        { value: 60, name: 'C' },
        { value: 30, name: 'D' },
      ],
    },
  ],
})
</script>

<template>
  <section class="h-full w-full grid place-items-center p-6">
    <div class="w-full max-w-5xl rounded-3xl p-6 bg-white/70 border border-slate-200/30 backdrop-blur-xl shadow-xl">
      <h2 class="m-0 text-2xl font-extrabold tracking-tight text-slate-800 text-center">环形图</h2>
      <p class="mt-2 text-center text-slate-600">适合突出整体与部分的关系。</p>
      <VChart class="mt-6 h-[60vh] w-full" :option="option" autoresize />
    </div>
  </section>
</template>
