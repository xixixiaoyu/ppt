<script setup lang="ts">
import { RocketLaunchIcon, BanknotesIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const pillars = [
  {
    icon: RocketLaunchIcon,
    title: '性能 (Performance)',
    subtitle: '让应用“跑得快”',
    color: 'emerald',
    points: [
      { title: '系统加速', text: '模型量化、知识蒸馏、上下文缓存、批处理。' },
      { title: '体验优化', text: '流式输出、分块处理、加载提示，降低感知延迟。' },
      { title: '任务分流', text: '不用“牛刀杀鸡”，简单任务交给规则或小模型。' },
    ],
  },
  {
    icon: BanknotesIcon,
    title: '成本 (Cost)',
    subtitle: '让应用“跑得起”',
    color: 'amber',
    points: [
      { title: '精明选型', text: '根据业务负载，选择性价比最高的 GPU 实例。' },
      { title: '弹性计费', text: '结合使用按量付费、预留实例和竞价实例。' },
      { title: '资源复用', text: '通过离线批量推理，充分利用闲置资源。' },
    ],
  },
  {
    icon: ShieldCheckIcon,
    title: '稳定性 (Stability)',
    subtitle: '让应用“跑得稳”',
    color: 'sky',
    points: [
      { title: '全面监控', text: '建立日志、追踪和告警体系，实时掌握服务状态。' },
      { title: '优雅降级', text: '核心服务异常时，有备用方案（如切换到小模型）。' },
      { title: '平滑发布', text: '通过灰度发布、A/B 测试，控制变更风险。' },
    ],
  },
]
</script>

<template>
  <div class="h-full w-full flex flex-col justify-center items-center p-8 bg-white">
    <div class="text-center mb-10 max-w-4xl">
      <h2
        class="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-500"
      >
        上线篇：生产实践
      </h2>
      <p class="text-lg text-slate-600 mt-3">部署只是开始，稳定、高效、经济地运行才是目标。</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
      <div
        v-for="pillar in pillars"
        :key="pillar.title"
        class="flex flex-col bg-white/60 backdrop-blur-sm ring-1 ring-slate-200/50 rounded-2xl shadow-lg p-6"
      >
        <div class="flex items-center gap-4">
          <component :is="pillar.icon" class="h-10 w-10" :class="`text-${pillar.color}-500`" />
          <div>
            <h3 class="text-2xl font-bold text-slate-800">
              {{ pillar.title }}
            </h3>
            <p class="text-slate-500 text-sm font-medium">{{ pillar.subtitle }}</p>
          </div>
        </div>
        <ul class="mt-6 space-y-4 text-sm text-slate-700 flex-grow">
          <li v-for="point in pillar.points" :key="point.title">
            <span class="font-semibold text-slate-700">{{ point.title }}:</span>
            <span class="text-slate-600 ml-1.5">{{ point.text }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
