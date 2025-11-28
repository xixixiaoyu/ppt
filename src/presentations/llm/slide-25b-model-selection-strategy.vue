<script setup lang="ts">
import Section from '@/shared/ui/Section.vue'
import Card from '@/shared/ui/Card.vue'
import HeadingGradient from '@/shared/ui/HeadingGradient.vue'
import {
  CurrencyDollarIcon,
  ScaleIcon,
  ServerStackIcon,
  CloudIcon,
  LockClosedIcon,
  ChartBarIcon,
} from '@heroicons/vue/24/outline'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()
</script>

<template>
  <Section>
    <Card padding="xl" class="grid place-items-center h-full">
      <div class="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-5 h-full">
        <!-- Header -->
        <div class="text-center shrink-0">
          <HeadingGradient
            :level="2"
            size="4xl"
            palette="indigo-fuchsia-emerald"
            class="leading-tight font-bold tracking-tight"
          >
            模型选型与成本经济学
          </HeadingGradient>
          <p class="text-lg text-slate-600 font-medium mt-1">
            Model Selection Strategy: 在性能、成本与隐私之间寻找最优解
          </p>
        </div>

        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
          <!-- Left Column: Open vs Closed Source -->
          <div class="flex flex-col gap-4">
            <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">
              <ScaleIcon class="w-5 h-5 text-indigo-500" />
              路线抉择：开源 vs 闭源
            </h3>

            <!-- Closed Source -->
            <div class="bg-white/60 rounded-xl p-4 border border-slate-200 shadow-sm">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <CloudIcon class="w-5 h-5 text-sky-500" />
                  <span class="font-bold text-slate-800">商业闭源模型 (API)</span>
                </div>
                <span class="text-xs font-mono bg-sky-50 text-sky-700 px-2 py-0.5 rounded"
                  >GPT-4, Claude 3.5</span
                >
              </div>
              <ul class="text-sm text-slate-600 space-y-1.5 ml-1">
                <li class="flex items-start gap-2">
                  <span class="text-green-500 text-xs mt-1">✅</span>
                  <span><strong>SOTA 性能:</strong> 拥有最强的推理与知识能力。</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500 text-xs mt-1">✅</span>
                  <span><strong>免运维:</strong> 无需管理 GPU 基础设施。</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-red-500 text-xs mt-1">❌</span>
                  <span><strong>数据隐私:</strong> 数据需发送至第三方服务器。</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-red-500 text-xs mt-1">❌</span>
                  <span><strong>长期成本:</strong> 高并发下 Token 费用昂贵。</span>
                </li>
              </ul>
            </div>

            <!-- Open Source -->
            <div class="bg-white/60 rounded-xl p-4 border border-slate-200 shadow-sm">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <ServerStackIcon class="w-5 h-5 text-orange-500" />
                  <span class="font-bold text-slate-800">开源私有化模型 (Local)</span>
                </div>
                <span class="text-xs font-mono bg-orange-50 text-orange-700 px-2 py-0.5 rounded"
                  >Llama 3, Qwen 2</span
                >
              </div>
              <ul class="text-sm text-slate-600 space-y-1.5 ml-1">
                <li class="flex items-start gap-2">
                  <span class="text-green-500 text-xs mt-1">✅</span>
                  <span><strong>绝对隐私:</strong> 数据不出内网，适合金融/医疗。</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500 text-xs mt-1">✅</span>
                  <span><strong>可定制:</strong> 允许全量微调 (Full Fine-tuning)。</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-red-500 text-xs mt-1">❌</span>
                  <span><strong>运维复杂:</strong> 需昂贵的 GPU 集群与专业运维。</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Right Column: Economics & Triangle -->
          <div class="flex flex-col gap-4">
            <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">
              <ChartBarIcon class="w-5 h-5 text-emerald-500" />
              成本优化与不可能三角
            </h3>

            <!-- The Triangle -->
            <div
              class="bg-slate-50 rounded-xl p-4 border border-slate-200 flex-1 flex flex-col items-center justify-center relative overflow-hidden"
            >
              <!-- Triangle Visual -->
              <div class="relative w-48 h-40">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <span class="font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded text-xs"
                    >性能 (Performance)</span
                  >
                  <div class="w-2 h-2 bg-indigo-400 rounded-full mt-1"></div>
                </div>
                <div class="absolute bottom-0 left-0 flex flex-col items-center">
                  <div class="w-2 h-2 bg-emerald-400 rounded-full mb-1"></div>
                  <span class="font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded text-xs"
                    >成本 (Cost)</span
                  >
                </div>
                <div class="absolute bottom-0 right-0 flex flex-col items-center">
                  <div class="w-2 h-2 bg-rose-400 rounded-full mb-1"></div>
                  <span class="font-bold text-rose-700 bg-rose-50 px-2 py-1 rounded text-xs"
                    >隐私 (Privacy)</span
                  >
                </div>
                <!-- Lines -->
                <svg class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: -1">
                  <polygon
                    points="96,25 20,135 172,135"
                    fill="none"
                    stroke="#cbd5e1"
                    stroke-width="2"
                  />
                </svg>
                <div
                  class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-slate-400 text-center w-32"
                >
                  通常只能<br />兼顾两项
                </div>
              </div>
            </div>

            <!-- Cost Saving Tips -->
            <div class="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
              <h4 class="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                <CurrencyDollarIcon class="w-4 h-4" />
                Token 经济学优化策略
              </h4>
              <div class="grid grid-cols-2 gap-3 text-xs">
                <div class="bg-white p-2 rounded border border-emerald-100/50">
                  <strong class="text-slate-800 block">Prompt Caching</strong>
                  <span class="text-slate-500"
                    >缓存公共前缀（如 System Prompt），降低 90% 首字延迟与成本。</span
                  >
                </div>
                <div class="bg-white p-2 rounded border border-emerald-100/50">
                  <strong class="text-slate-800 block">Model Routing</strong>
                  <span class="text-slate-500"
                    >简单问题路由给小模型 (Llama 3 8B)，复杂问题给大模型 (GPT-4)。</span
                  >
                </div>
                <div class="bg-white p-2 rounded border border-emerald-100/50">
                  <strong class="text-slate-800 block">Batch Inference</strong>
                  <span class="text-slate-500">离线批量处理任务，通常可获得 50% 的价格折扣。</span>
                </div>
                <div class="bg-white p-2 rounded border border-emerald-100/50">
                  <strong class="text-slate-800 block">Distillation</strong>
                  <span class="text-slate-500">用大模型生成数据微调小模型，以小博大。</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </Section>
</template>
