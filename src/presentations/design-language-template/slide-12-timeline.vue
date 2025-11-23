<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

type Status = 'done' | 'in_progress' | 'planned'

const milestones: { label: string; title: string; description: string; status: Status }[] = [
  {
    label: '2025 Q1',
    title: '搭建框架',
    description: '完成 Vue 3 + Tailwind 的基础演示框架与容器。',
    status: 'done',
  },
  {
    label: '2025 Q2',
    title: '发布模板库',
    description: '提供通用页型：图表、清单、对比、FAQ、互动等。',
    status: 'in_progress',
  },
  {
    label: '2025 Q3',
    title: '扩展互动',
    description: '补充投票、测验、演讲者备注、远程控制等高级功能。',
    status: 'planned',
  },
  {
    label: '2025 Q4',
    title: '生态与协作',
    description: '开放插件接口，沉淀最佳实践与主题生态。',
    status: 'planned',
  },
]

const statusGradient = (s: Status) =>
  s === 'done'
    ? 'from-emerald-500 to-cyan-500'
    : s === 'in_progress'
    ? 'from-indigo-500 to-fuchsia-500'
    : 'from-slate-400 to-slate-500'

const statusChip = (s: Status) =>
  s === 'done'
    ? 'bg-emerald-100 text-emerald-700'
    : s === 'in_progress'
    ? 'bg-indigo-100 text-indigo-700'
    : 'bg-slate-100 text-slate-700'
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8 text-center">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400"
      >
        路线图（占位）
      </h2>
      <p class="mt-2 text-slate-600 max-w-2xl mx-auto">
        用于展示里程碑与版本规划，强调阶段目标与状态。
      </p>
    </div>

    <div class="relative">
      <div class="absolute left-5 top-0 bottom-0 w-px bg-slate-200/60"></div>
      <ul class="space-y-6">
        <li
          v-for="(m, i) in milestones"
          :key="m.label"
          class="grid grid-cols-[40px_1fr] items-start gap-x-4"
        >
          <div class="relative">
            <span
              class="grid place-items-center w-10 h-10 rounded-full bg-gradient-to-r text-white shadow-md ring-2 ring-white/60"
              :class="statusGradient(m.status)"
            >
              <span class="text-xs font-bold">{{ i + 1 }}</span>
            </span>
          </div>
          <div
            class="rounded-2xl border border-slate-200/30 bg-white/70 backdrop-blur-md shadow-xl p-5"
          >
            <div class="flex items-center justify-between gap-4">
              <h3 class="text-lg md:text-xl font-bold text-slate-900">
                {{ m.label }} · {{ m.title }}
              </h3>
              <span
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                :class="statusChip(m.status)"
              >
                {{
                  m.status === 'done' ? '已完成' : m.status === 'in_progress' ? '进行中' : '计划中'
                }}
              </span>
            </div>
            <p class="mt-2 text-slate-700 text-sm">{{ m.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
