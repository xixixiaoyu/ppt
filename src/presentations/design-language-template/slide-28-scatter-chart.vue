<script setup lang="ts">
import { ref } from 'vue'
import { VChart } from '@/shared/charts/echarts'
import type { EChartsOption } from '@/shared/charts/echarts'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const option = ref<EChartsOption>({
  title: { text: '散点分布图', left: 'center' },
  tooltip: { trigger: 'item' },
  grid: { left: 40, right: 20, bottom: 40, top: 80 },
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  series: [
    { name: '样本 A', type: 'scatter', symbolSize: 12, data: [[10, 8], [20, 20], [36, 14], [48, 28], [60, 30]] },
    { name: '样本 B', type: 'scatter', symbolSize: 12, data: [[12, 4], [22, 16], [30, 10], [46, 22], [58, 26]] },
  ],
})
</script>

<template>
  <section class="h-full w-full grid place-items-center p-6">
    <div class="w-full max-w-5xl rounded-3xl p-6 bg-white/70 border border-slate-200/30 backdrop-blur-xl shadow-xl">
      <h2 class="m-0 text-2xl font-extrabold tracking-tight text-slate-800 text-center">散点分布图</h2>
      <p class="mt-2 text-center text-slate-600">直观展示变量间的关系与聚类。</p>
      <VChart class="mt-6 h-[60vh] w-full" :option="option" autoresize />
    </div>
  </section>
</template>
