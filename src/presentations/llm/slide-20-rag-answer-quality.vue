<script setup lang="ts">
import Section from '@/shared/ui/Section.vue'
import Card from '@/shared/ui/Card.vue'
import HeadingGradient from '@/shared/ui/HeadingGradient.vue'
import { UserGroupIcon, TrophyIcon } from '@heroicons/vue/24/solid'
import { ChatBubbleLeftRightIcon, CircleStackIcon, HandThumbUpIcon } from '@heroicons/vue/24/outline'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()
</script>

<template>
  <Section>
    <Card padding="xl" class="grid place-items-center">
      <div class="relative z-10 px-6 py-4 md:py-8 w-full max-w-7xl">
        <div class="text-center mb-10">
          <HeadingGradient
            :level="2"
            size="5xl"
            palette="indigo-fuchsia-emerald"
            class="leading-tight"
          >
            如何评估 RAG 回答质量
          </HeadingGradient>
          <p class="mt-4 text-lg text-slate-600 max-w-4xl mx-auto">
            从“金标准”数据到真实用户反馈，构建全方位的质量评估体系。
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <!-- Method 1: Golden Dataset -->
          <div class="bg-amber-50/50 rounded-2xl p-6 border border-amber-100 flex flex-col h-full">
            <div class="mb-4 p-3 bg-amber-100 w-fit rounded-xl">
              <CircleStackIcon class="w-8 h-8 text-amber-600" />
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">1. 金标准数据集 (Golden Dataset)</h3>
            <p class="text-slate-600 text-sm flex-grow">
              构建高质量的 QA 对（问题+标准答案）。
            </p>
            <ul class="mt-4 space-y-2 text-sm text-slate-700">
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                <span>人工专家标注</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                <span>合成数据生成 (Synthetic Data)</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                <span>定期更新维护</span>
              </li>
            </ul>
          </div>

          <!-- Method 2: LLM-as-a-Judge -->
          <div class="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100 flex flex-col h-full">
            <div class="mb-4 p-3 bg-indigo-100 w-fit rounded-xl">
              <TrophyIcon class="w-8 h-8 text-indigo-600" />
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">2. LLM-as-a-Judge</h3>
            <p class="text-slate-600 text-sm flex-grow">
              使用更强大的模型（如 GPT-4）来评价小模型的输出。
            </p>
            <ul class="mt-4 space-y-2 text-sm text-slate-700">
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                <span>高效、低成本</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                <span>给出评分理由 (Reasoning)</span>
              </li>
               <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                <span>Pairwise Comparison (成对比较)</span>
              </li>
            </ul>
          </div>

          <!-- Method 3: Human & User Feedback -->
          <div class="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 flex flex-col h-full">
            <div class="mb-4 p-3 bg-emerald-100 w-fit rounded-xl">
              <UserGroupIcon class="w-8 h-8 text-emerald-600" />
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">3. 人工评估与反馈</h3>
            <p class="text-slate-600 text-sm flex-grow">
              最终的检验标准是人类的真实感受。
            </p>
            <ul class="mt-4 space-y-2 text-sm text-slate-700">
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                <span>Elo Rating (竞技场模式)</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                <span>A/B Testing</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                <span class="flex items-center gap-1">
                    用户点赞/点踩 
                    <HandThumbUpIcon class="w-3 h-3 text-slate-400"/>
                </span>
              </li>
            </ul>
          </div>

        </div>

        <!-- Bottom: Feedback Loop -->
        <div class="mt-8 bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center justify-center gap-4">
             <ChatBubbleLeftRightIcon class="w-6 h-6 text-slate-500" />
             <p class="text-slate-700 font-medium">
                数据飞轮：收集 Bad Cases -> 优化检索/Prompt -> 更新评估集 -> 持续迭代
             </p>
        </div>

      </div>
    </Card>
  </Section>
</template>
