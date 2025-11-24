<script setup lang="ts">
import { CloudArrowUpIcon, ServerStackIcon, CodeBracketIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const options = [
  {
    icon: CodeBracketIcon,
    title: '入门：直接调用 API',
    description: '使用云厂商（如阿里云百炼）提供的预置模型服务。',
    points: [
      { type: 'pro', text: '零部署、零运维' },
      { type: 'pro', text: '按需付费，成本可控' },
      { type: 'con', text: '有调用频率限制 (QPM/TPM)' },
      { type: 'con', text: '不支持自定义模型' },
    ],
    fit: '业务初期、快速验证',
    recommended: false,
  },
  {
    icon: ServerStackIcon,
    title: '进阶：手动部署 (vLLM)',
    description: '在自有服务器上，使用 vLLM 等框架部署开源或微调模型。',
    points: [
      { type: 'pro', text: '完全控制模型和环境' },
      { type: 'pro', text: '无外部调用限制' },
      { type: 'con', text: '运维成本高，需要专业技能' },
      { type: 'con', text: '资源扩展性、可靠性受限' },
    ],
    fit: '内部研究、特定场景',
    recommended: false,
  },
  {
    icon: CloudArrowUpIcon,
    title: '生产：云服务部署',
    description: '利用专业的云产品（百炼、PAI-EAS、FC 等）实现高可用部署。',
    points: [
      { type: 'pro', text: '高可用、高并发、弹性伸缩' },
      { type: 'pro', text: '运维负担轻，专注业务' },
      { type: 'pro', text: '丰富的生态集成' },
      { type: 'con', text: '平台有一定学习成本' },
    ],
    fit: '所有生产级应用',
    recommended: true,
  },
]
</script>

<template>
  <section class="h-full w-full grid grid-rows-[auto_1fr] p-6 lg:p-10">
    <div class="flex-none text-center">
      <h2 class="text-4xl font-extrabold">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-500">
          上线篇：模型部署 (Model Deployment)
        </span>
      </h2>
      <p class="mt-2 text-slate-600 max-w-3xl mx-auto">
        将训练好的模型投入生产，使其创造真实价值。
      </p>
    </div>

    <div class="grid place-items-center">
      <div class="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <article
          v-for="option in options"
          :key="option.title"
          class="flex flex-col bg-white/60 backdrop-blur-sm p-6 border rounded-2xl shadow-lg transition hover:-translate-y-0.5"
          :class="{ 'ring-2 ring-indigo-500/50': option.recommended }"
        >
          <div class="flex items-start justify-between mb-4">
            <component :is="option.icon" class="h-10 w-10 text-slate-600" />
            <span v-if="option.recommended" class="rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-xs font-semibold">推荐</span>
          </div>
          <h3 class="text-xl font-bold text-slate-900">{{ option.title }}</h3>
          <p class="text-slate-700 mt-2 text-sm flex-grow">{{ option.description }}</p>
          
          <ul class="mt-4 space-y-2 text-sm">
            <li v-for="point in option.points" :key="point.text" class="flex items-start gap-2">
              <CheckCircleIcon v-if="point.type === 'pro'" class="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <XCircleIcon v-else class="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <span class="text-slate-800">{{ point.text }}</span>
            </li>
          </ul>

          <div class="mt-6 text-center pt-4 border-t border-slate-200/80">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700">
              适合：{{ option.fit }}
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
