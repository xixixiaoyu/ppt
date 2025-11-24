<script setup lang="ts">
import { computed } from 'vue'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const labels = ['阶段 A', '阶段 B', '阶段 C', '阶段 D', '阶段 E']

const rawSeries = [
  {
    name: '示例策略',
    gradientId: 'lineGradientA',
    cssGradient: 'linear-gradient(120deg, rgb(var(--accent) / 0.95), rgb(var(--accent) / 0.6))',
    values: [32, 48, 55, 62, 72],
    delay: 0
  },
  {
    name: '对照方案',
    gradientId: 'lineGradientB',
    cssGradient: 'linear-gradient(120deg, rgb(var(--accent) / 0.6), rgb(var(--accent) / 0.4))',
    values: [28, 36, 44, 53, 60],
    delay: 150
  }
] as const

const barSeries = {
  name: '体量参考',
  gradientId: 'barGradient',
  cssGradient: 'linear-gradient(180deg, rgb(var(--accent) / 0.9), rgb(var(--accent) / 0.5))',
  values: [40, 52, 58, 64, 70]
} as const

const width = 640
const height = 360
const padding = { top: 40, right: 40, bottom: 60, left: 64 }
const plotWidth = width - padding.left - padding.right
const plotHeight = height - padding.top - padding.bottom

const maxValue = Math.max(
  ...rawSeries.flatMap(series => series.values),
  ...barSeries.values
) * 1.1

const stepX = plotWidth / (labels.length - 1)

const yFor = (value: number) => padding.top + (plotHeight - (value / maxValue) * plotHeight)
const xFor = (index: number) => padding.left + index * stepX

const chartSeries = computed(() =>
  rawSeries.map(series => {
    const points = series.values.map((value, index) => ({
      x: xFor(index),
      y: yFor(value),
      value
    }))
    const d = points
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
      .join(' ')
    return {
      ...series,
      points,
      path: d
    }
  })
)

const guideLines = computed(() => {
  const divisions = 4
  const lines = [] as { y: number; label: string }[]
  for (let i = 0; i <= divisions; i++) {
    const value = (maxValue / divisions) * i
    lines.push({ y: yFor(value), label: `${Math.round(value)}` })
  }
  return lines
})

const barWidth = stepX * 0.5

const barRects = computed(() =>
  barSeries.values.map((value, index) => {
    const scaledHeight = (value / maxValue) * plotHeight
    const y = padding.top + (plotHeight - scaledHeight)
    const x = xFor(index) - barWidth / 2
    return {
      x,
      y,
      height: scaledHeight,
      label: labels[index],
      value
    }
  })
)

const legendEntries = computed(() => [barSeries, ...chartSeries.value])
</script>

<template>
  <section class="h-full w-full flex items-center justify-center p-[clamp(1.5rem,4vw,4rem)]">
    <div class="w-full max-w-[960px] rounded-[32px] p-[clamp(1.5rem,4vw,2.5rem)] bg-white/70 border border-slate-200/30 backdrop-blur-[18px] shadow-[0_40px_100px_-40px_rgba(15,23,42,0.35)] flex flex-col gap-[clamp(1rem,2vw,1.5rem)]">
      <header>
        <h3 class="m-0 text-[clamp(1.4rem,3vw,1.9rem)] font-extrabold tracking-tight text-slate-800">趋势对比（示例）</h3>
        <p class="mt-2 text-slate-600 text-[0.95rem]">纯 SVG 绘制的线图，展示不同方案的趋势变化。数据为占位。</p>
      </header>

      <div>
        <svg :viewBox="`0 0 ${width} ${height}`" role="img" aria-label="示例折线图" class="w-full h-auto">
          <defs>
            <linearGradient id="lineGradientA" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" :style="{ stopColor: 'rgb(var(--accent) / 0.95)' }" />
              <stop offset="100%" :style="{ stopColor: 'rgb(var(--accent) / 0.6)' }" />
            </linearGradient>
            <linearGradient id="lineGradientB" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" :style="{ stopColor: 'rgb(var(--accent) / 0.6)' }" />
              <stop offset="100%" :style="{ stopColor: 'rgb(var(--accent) / 0.4)' }" />
            </linearGradient>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" :style="{ stopColor: 'rgb(var(--accent) / 0.9)' }" />
              <stop offset="100%" :style="{ stopColor: 'rgb(var(--accent) / 0.5)' }" />
            </linearGradient>
          </defs>

          <!-- 背景 -->
          <rect x="0" y="0" :width="width" :height="height" rx="32" fill="rgba(248, 250, 252, 0.65)" stroke="rgba(148, 163, 184, 0.2)" />

          <!-- 横向网格线 -->
          <g>
            <line
              v-for="(line, idx) in guideLines"
              :key="idx"
              :x1="padding.left"
              :x2="width - padding.right"
              :y1="line.y"
              :y2="line.y"
              stroke="rgba(148, 163, 184, 0.3)"
              stroke-dasharray="6 10"
            />
          </g>

          <!-- Y 轴标签 -->
          <g>
            <text
              v-for="(line, idx) in guideLines"
              :key="`y-${idx}`"
              :x="padding.left - 16"
              :y="line.y + 4"
              fill="rgba(71, 85, 105, 0.7)"
              font-size="12"
              text-anchor="end"
              dominant-baseline="middle"
            >
              {{ line.label }}
            </text>
          </g>

          <!-- X 轴标签 -->
          <g>
            <text
              v-for="(label, idx) in labels"
              :key="`x-${idx}`"
              :x="xFor(idx)"
              :y="height - padding.bottom + 28"
              fill="rgba(71, 85, 105, 0.7)"
              font-size="12"
              text-anchor="middle"
              dominant-baseline="hanging"
            >
              {{ label }}
            </text>
          </g>

          <!-- 柱状图 -->
          <g>
            <rect
              v-for="(bar, idx) in barRects"
              :key="`bar-${idx}`"
              class="drop-shadow-[0_16px_28px_rgba(15,23,42,0.18)]"
              :x="bar.x"
              :width="barWidth"
              :y="bar.y"
              :height="bar.height"
              fill="url(#barGradient)"
              rx="8"
            >
              <animate attributeName="y" :from="padding.top + plotHeight" :to="bar.y" dur="0.6s" :begin="(idx * 0.08) + 's'" fill="freeze" />
              <animate attributeName="height" from="0" :to="bar.height" dur="0.6s" :begin="(idx * 0.08) + 's'" fill="freeze" />
            </rect>
          </g>

          <!-- 折线 -->
          <g>
            <template v-for="(series, si) in chartSeries" :key="series.name">
              <path
                fill="none"
                :d="series.path"
                :stroke="`url(#${series.gradientId})`"
                pathLength="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
                stroke-dasharray="1"
                stroke-dashoffset="1"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="1"
                  to="0"
                  dur="1.2s"
                  :begin="`${si * 0.2}s`"
                  fill="freeze"
                />
              </path>
              <circle
                v-for="(point, pi) in series.points"
                :key="`${series.name}-${pi}`"
                class="drop-shadow-[0_4px_12px_rgba(99,102,241,0.35)]"
                :cx="point.x"
                :cy="point.y"
                r="6"
                :fill="`url(#${series.gradientId})`"
              >
                <animate
                  attributeName="r"
                  values="0;6;6"
                  dur="0.8s"
                  :begin="`${0.2 + pi * 0.08}s`"
                  fill="freeze"
                />
              </circle>
            </template>
          </g>
        </svg>
      </div>

      <footer class="flex gap-5 flex-wrap text-[0.9rem] text-slate-800/85">
        <div class="inline-flex items-center gap-2" v-for="(entry, si) in legendEntries" :key="`legend-${entry.name}`">
          <span class="inline-block w-[18px] h-[18px] rounded-[6px] bg-[length:100%_100%] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]" :style="{ backgroundImage: entry.cssGradient }"></span>
          <span class="font-semibold">{{ entry.name }}</span>
        </div>
      </footer>
    </div>
  </section>
</template>
