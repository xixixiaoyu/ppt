<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent])

const props = defineProps<{
  type: 'success' | 'overfitting'
}>()

const chartOption = computed(() => {
  const isSuccess = props.type === 'success'
  
  // Generate data points
  const steps = Array.from({ length: 20 }, (_, i) => i + 1)
  
  // Training loss always goes down
  const trainLoss = steps.map(x => 5 * Math.exp(-0.2 * x) + 0.5 + Math.random() * 0.2)
  
  // Validation loss depends on type
  const valLoss = isSuccess
    ? steps.map(x => 5.2 * Math.exp(-0.2 * x) + 0.6 + Math.random() * 0.2) // Success: follows train
    : steps.map(x => {
        // Overfitting: goes down then up
        if (x < 8) return 5.2 * Math.exp(-0.2 * x) + 0.6 + Math.random() * 0.2
        return 0.6 + 0.15 * (x - 8) + Math.random() * 0.2
      })

  const color = isSuccess ? '#10b981' : '#f59e0b' // emerald-500 : amber-500

  return {
    backgroundColor: 'transparent',
    grid: {
      top: 30,
      right: 10,
      bottom: 20,
      left: 30,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Train Loss', 'Val Loss'],
      textStyle: { color: '#64748b' },
      bottom: 0
    },
    xAxis: {
      type: 'category',
      data: steps,
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { show: false },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { lineStyle: { type: 'dashed', color: '#e2e8f0' } }
    },
    series: [
      {
        name: 'Train Loss',
        type: 'line',
        data: trainLoss,
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 3, color: '#64748b' }, // slate-500
        itemStyle: { color: '#64748b' }
      },
      {
        name: 'Val Loss',
        type: 'line',
        data: valLoss,
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 3, color: color },
        itemStyle: { color: color }
      }
    ]
  }
})
</script>

<template>
  <div class="h-48 w-full">
    <VChart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<style scoped>
.chart {
  height: 100%;
  width: 100%;
}
</style>
