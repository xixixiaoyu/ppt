<script setup lang="ts">
import Section from '@/shared/ui/Section.vue'
import Card from '@/shared/ui/Card.vue'
import HeadingGradient from '@/shared/ui/HeadingGradient.vue'
import { MagnifyingGlassIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/solid'
import { CheckCircleIcon, ChartBarIcon } from '@heroicons/vue/24/outline'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()
</script>

<template>
  <Section>
    <Card padding="xl" class="grid place-items-center">
      <div class="relative z-10 px-6 py-4 md:py-8 w-full max-w-7xl">
        <div class="text-center mb-12">
          <HeadingGradient
            :level="2"
            size="5xl"
            palette="indigo-fuchsia-emerald"
            class="leading-tight"
          >
            RAG 自动化评估维度
          </HeadingGradient>
          <p class="mt-4 text-lg text-slate-600 max-w-4xl mx-auto">
            评估 RAG 系统不能只凭感觉，需要从“检索”和“生成”两个核心环节进行量化分析。
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <!-- Retrieval Quality -->
          <div class="space-y-6">
            <h3 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <div class="p-2 bg-blue-100 rounded-lg text-blue-600">
                <MagnifyingGlassIcon class="w-6 h-6" />
              </div>
              检索质量 (Retrieval)
            </h3>
            <div class="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 space-y-4">
              <p class="text-sm text-slate-600 mb-2">评估检索到的上下文片段是否精准、覆盖全面。</p>

              <div class="space-y-3">
                <div class="flex gap-3">
                  <div class="mt-1">
                    <ChartBarIcon class="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-800">Context Precision (上下文精确度)</h4>
                    <p class="text-sm text-slate-600">
                      检索出的文档中，真正相关的文档占比多少？（减少噪声）
                    </p>
                  </div>
                </div>

                <div class="flex gap-3">
                  <div class="mt-1">
                    <CheckCircleIcon class="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-800">Context Recall (上下文召回率)</h4>
                    <p class="text-sm text-slate-600">
                      所有相关的文档是否都被检索出来了？（避免遗漏）
                    </p>
                  </div>
                </div>

                <div class="flex gap-3">
                  <div class="mt-1">
                    <span
                      class="font-mono font-bold text-xs bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded"
                      >MRR</span
                    >
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-800">Mean Reciprocal Rank</h4>
                    <p class="text-sm text-slate-600">第一个相关文档排在多靠前的位置？</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Generation Quality -->
          <div class="space-y-6">
            <h3 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <div class="p-2 bg-violet-100 rounded-lg text-violet-600">
                <ChatBubbleBottomCenterTextIcon class="w-6 h-6" />
              </div>
              生成质量 (Generation)
            </h3>
            <div class="bg-violet-50/50 rounded-2xl p-6 border border-violet-100 space-y-4">
              <p class="text-sm text-slate-600 mb-2">评估 LLM 生成的回答是否准确、相关且无幻觉。</p>

              <div class="space-y-3">
                <div class="flex gap-3">
                  <div class="mt-1">
                    <CheckCircleIcon class="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-800">Faithfulness (忠实度)</h4>
                    <p class="text-sm text-slate-600">
                      回答是否完全基于检索到的上下文？（检测幻觉）
                    </p>
                  </div>
                </div>

                <div class="flex gap-3">
                  <div class="mt-1">
                    <ChartBarIcon class="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-800">Answer Relevance (回答相关性)</h4>
                    <p class="text-sm text-slate-600">回答是否直接解决了用户提出的问题？</p>
                  </div>
                </div>

                <div class="flex gap-3">
                  <div class="mt-1">
                    <span
                      class="font-mono font-bold text-xs bg-violet-200 text-violet-800 px-1.5 py-0.5 rounded"
                      >Sim</span
                    >
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-800">Semantic Similarity</h4>
                    <p class="text-sm text-slate-600">
                      生成的回答与标准答案（如果有）的语义相似度。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </Section>
</template>
