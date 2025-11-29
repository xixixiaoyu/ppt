<script setup lang="ts">
import Section from '@/shared/ui/Section.vue'
import Card from '@/shared/ui/Card.vue'
import HeadingGradient from '@/shared/ui/HeadingGradient.vue'
import {
  MagnifyingGlassIcon,
  ChatBubbleBottomCenterTextIcon,
  TrophyIcon,
  UserGroupIcon,
  BeakerIcon,
} from '@heroicons/vue/24/solid'
import {
  ChartBarIcon,
  CheckCircleIcon,
  CheckBadgeIcon,
  CircleStackIcon,
  ArrowPathIcon,
} from '@heroicons/vue/24/outline'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()
</script>

<template>
  <Section>
    <Card padding="xl" class="grid place-items-center h-full">
      <div
        class="relative z-10 px-6 py-4 w-full max-w-7xl h-full flex flex-col"
      >
        <!-- Header -->
        <div class="text-center mb-8 shrink-0">
          <HeadingGradient
            :level="2"
            size="4xl"
            palette="indigo-fuchsia-emerald"
            class="leading-tight"
          >
            RAG 评估体系：维度、指标与方法
          </HeadingGradient>
          <p class="mt-2 text-lg text-slate-600 max-w-4xl mx-auto">
            从“检索”与“生成”双维度切入，利用 RAGAS
            框架与多层次评估手段构建质量闭环。
          </p>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-rows-[auto_1fr] gap-6 flex-grow min-h-0">
          <!-- Row 1: Dimensions & Metrics (RAGAS) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Retrieval Side -->
            <div
              class="bg-blue-50/60 rounded-2xl p-5 border border-blue-100 flex flex-col"
            >
              <h3
                class="text-lg font-bold text-slate-800 flex items-center gap-2 mb-3"
              >
                <div class="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                  <MagnifyingGlassIcon class="w-5 h-5" />
                </div>
                检索质量 (Retrieval)
              </h3>
              <div class="grid grid-cols-2 gap-3 flex-grow">
                <div
                  class="bg-white/60 rounded-xl p-3 border border-blue-100/50"
                >
                  <div class="flex items-center gap-2 mb-1">
                    <ChartBarIcon class="w-4 h-4 text-blue-600" />
                    <h4 class="font-bold text-sm text-slate-800">
                      Context Precision
                    </h4>
                  </div>
                  <p class="text-xs text-slate-600 leading-snug">
                    检索内容的“纯度”，减少噪声干扰。
                  </p>
                </div>
                <div
                  class="bg-white/60 rounded-xl p-3 border border-blue-100/50"
                >
                  <div class="flex items-center gap-2 mb-1">
                    <CheckCircleIcon class="w-4 h-4 text-blue-600" />
                    <h4 class="font-bold text-sm text-slate-800">
                      Context Recall
                    </h4>
                  </div>
                  <p class="text-xs text-slate-600 leading-snug">
                    关键信息是否“找全”了？(需 Ground Truth)
                  </p>
                </div>
              </div>
            </div>

            <!-- Generation Side -->
            <div
              class="bg-violet-50/60 rounded-2xl p-5 border border-violet-100 flex flex-col"
            >
              <h3
                class="text-lg font-bold text-slate-800 flex items-center gap-2 mb-3"
              >
                <div class="p-1.5 bg-violet-100 rounded-lg text-violet-600">
                  <ChatBubbleBottomCenterTextIcon class="w-5 h-5" />
                </div>
                生成质量 (Generation)
              </h3>
              <div class="grid grid-cols-2 gap-3 flex-grow">
                <div
                  class="bg-white/60 rounded-xl p-3 border border-violet-100/50"
                >
                  <div class="flex items-center gap-2 mb-1">
                    <CheckBadgeIcon class="w-4 h-4 text-violet-600" />
                    <h4 class="font-bold text-sm text-slate-800">
                      Faithfulness
                    </h4>
                  </div>
                  <p class="text-xs text-slate-600 leading-snug">
                    <span class="font-semibold text-violet-700">忠实度</span
                    >：回答是否完全基于上下文？(防幻觉)
                  </p>
                </div>
                <div
                  class="bg-white/60 rounded-xl p-3 border border-violet-100/50"
                >
                  <div class="flex items-center gap-2 mb-1">
                    <BeakerIcon class="w-4 h-4 text-violet-600" />
                    <h4 class="font-bold text-sm text-slate-800">
                      Answer Relevance
                    </h4>
                  </div>
                  <p class="text-xs text-slate-600 leading-snug">
                    <span class="font-semibold text-violet-700">相关性</span
                    >：是否直接回答了用户的问题？
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 2: Methodology (The "How") -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Method 1 -->
            <div
              class="bg-amber-50/50 rounded-2xl p-5 border border-amber-100 relative overflow-hidden"
            >
              <div class="absolute top-0 right-0 p-3 opacity-10">
                <CircleStackIcon class="w-24 h-24 text-amber-600" />
              </div>
              <div class="relative z-10">
                <h3
                  class="text-base font-bold text-slate-800 mb-2 flex items-center gap-2"
                >
                  <span
                    class="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs"
                    >1</span
                  >
                  金标准 (Golden Dataset)
                </h3>
                <ul class="space-y-1.5 text-xs text-slate-700">
                  <li class="flex items-start gap-2">
                    <span
                      class="mt-1 w-1 h-1 bg-amber-400 rounded-full shrink-0"
                    ></span>
                    <span>构建高质量 QA 对 (问题+标准答案)</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span
                      class="mt-1 w-1 h-1 bg-amber-400 rounded-full shrink-0"
                    ></span>
                    <span>来源：人工专家标注 / 合成数据</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Method 2 -->
            <div
              class="bg-indigo-50/50 rounded-2xl p-5 border border-indigo-100 relative overflow-hidden"
            >
              <div class="absolute top-0 right-0 p-3 opacity-10">
                <TrophyIcon class="w-24 h-24 text-indigo-600" />
              </div>
              <div class="relative z-10">
                <h3
                  class="text-base font-bold text-slate-800 mb-2 flex items-center gap-2"
                >
                  <span
                    class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs"
                    >2</span
                  >
                  LLM-as-a-Judge
                </h3>
                <ul class="space-y-1.5 text-xs text-slate-700">
                  <li class="flex items-start gap-2">
                    <span
                      class="mt-1 w-1 h-1 bg-indigo-400 rounded-full shrink-0"
                    ></span>
                    <span
                      >自动化评分核心 (如
                      <span class="font-mono font-bold text-indigo-700"
                        >RAGAS</span
                      >)</span
                    >
                  </li>
                  <li class="flex items-start gap-2">
                    <span
                      class="mt-1 w-1 h-1 bg-indigo-400 rounded-full shrink-0"
                    ></span>
                    <span>用 GPT-4 评价小模型，给出理由</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Method 3 -->
            <div
              class="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100 relative overflow-hidden"
            >
              <div class="absolute top-0 right-0 p-3 opacity-10">
                <UserGroupIcon class="w-24 h-24 text-emerald-600" />
              </div>
              <div class="relative z-10">
                <h3
                  class="text-base font-bold text-slate-800 mb-2 flex items-center gap-2"
                >
                  <span
                    class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs"
                    >3</span
                  >
                  人工反馈 (Human Loop)
                </h3>
                <ul class="space-y-1.5 text-xs text-slate-700">
                  <li class="flex items-start gap-2">
                    <span
                      class="mt-1 w-1 h-1 bg-emerald-400 rounded-full shrink-0"
                    ></span>
                    <span>最终检验：用户点赞/点踩</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span
                      class="mt-1 w-1 h-1 bg-emerald-400 rounded-full shrink-0"
                    ></span>
                    <span>A/B Testing & Elo Rating</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Bottom: Feedback Loop -->
          <div
            class="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-center gap-3"
          >
            <ArrowPathIcon class="w-5 h-5 text-slate-500" />
            <p class="text-sm text-slate-700 font-medium">
              <span class="text-slate-500">数据飞轮：</span> 收集 Bad Cases
              <span class="text-slate-400">-></span> 优化检索/Prompt
              <span class="text-slate-400">-></span> 更新评估集
              <span class="text-slate-400">-></span> 持续迭代
            </p>
          </div>
        </div>
      </div>
    </Card>
  </Section>
</template>
