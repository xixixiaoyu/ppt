<script setup lang="ts">
import { CloudArrowUpIcon, ServerStackIcon, CodeBracketIcon } from '@heroicons/vue/24/outline'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const options = [
  {
    icon: CodeBracketIcon,
    title: '入门：直接调用 API',
    description: '使用云厂商（如阿里云百炼）提供的预置模型服务。',
    pros: ['零部署、零运维', '按需付费，成本可控'],
    cons: ['有调用频率限制 (QPM/TPM)', '不支持自定义模型'],
    fit: '业务初期、快速验证',
    recommended: false,
  },
  {
    icon: ServerStackIcon,
    title: '进阶：手动部署 (vLLM)',
    description: '在自有服务器上，使用 vLLM 等框架部署开源或微调模型。',
    pros: ['完全控制模型和环境', '无外部调用限制'],
    cons: ['运维成本高，需要专业技能', '资源扩展性、可靠性受限'],
    fit: '内部研究、特定场景',
    recommended: false,
  },
  {
    icon: CloudArrowUpIcon,
    title: '生产：云服务部署',
    description: '利用专业的云产品（百炼、PAI-EAS、FC 等）实现高可用部署。',
    pros: ['高可用、高并发、弹性伸缩', '运维负担轻，专注业务', '丰富的生态集成'],
    cons: ['平台有一定学习成本'],
    fit: '所有生产级应用',
    recommended: true,
  },
]
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center p-8">
    <div class="text-center mb-10 max-w-4xl">
      <h2 class="text-4xl font-bold text-slate-900">上线篇：模型部署 (Model Deployment)</h2>
      <p class="text-lg text-slate-600 mt-2">将训练好的模型投入生产，使其创造真实价值。</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
      <div
        v-for="option in options"
        :key="option.title"
        class="flex flex-col bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-1.5"
        :class="{
          'relative border-transparent bg-clip-padding before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-gradient-to-r before:from-indigo-500 before:to-fuchsia-500':
            option.recommended,
        }"
      >
        <div class="flex-1 flex flex-col p-6 bg-white rounded-[calc(1.5rem-0.375rem)] h-full">
          <component
            :is="option.icon"
            class="h-10 w-10 mb-4"
            :class="[option.recommended ? 'text-indigo-500' : 'text-slate-500']"
          />
          <h3 class="text-2xl font-bold text-slate-900">{{ option.title }}</h3>
          <p class="text-slate-600 mt-2 flex-grow text-sm">{{ option.description }}</p>
          <div class="mt-4 space-y-3">
            <div>
              <p class="font-semibold text-emerald-700">优点：</p>
              <ul class="list-disc list-inside text-sm text-slate-700/80 space-y-1 mt-1">
                <li v-for="pro in option.pros" :key="pro">{{ pro }}</li>
              </ul>
            </div>
            <div>
              <p class="font-semibold text-amber-700">缺点：</p>
              <ul class="list-disc list-inside text-sm text-slate-700/80 space-y-1 mt-1">
                <li v-for="con in option.cons" :key="con">{{ con }}</li>
              </ul>
            </div>
          </div>
          <div class="mt-6 text-center">
            <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
              :class="[
                option.recommended
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-slate-100 text-slate-700',
              ]"
            >
              适合：{{ option.fit }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
