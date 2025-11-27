<script setup lang="ts">
import Section from '@/shared/ui/Section.vue'
import Card from '@/shared/ui/Card.vue'
import HeadingGradient from '@/shared/ui/HeadingGradient.vue'
import { BookOpenIcon, BeakerIcon } from '@heroicons/vue/24/solid'
import { ArrowPathIcon, CheckBadgeIcon } from '@heroicons/vue/24/outline'

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
            RAGAS: RAG Assessment
          </HeadingGradient>
          <p class="mt-4 text-lg text-slate-600 max-w-4xl mx-auto">
            业界主流的 RAG 自动化评估框架，利用 LLM 作为裁判 (LLM-as-a-Judge) 进行评分。
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <!-- Left: Core Concept -->
          <div class="space-y-6">
             <div class="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                <h3 class="text-xl font-bold text-indigo-900 flex items-center gap-2 mb-4">
                  <BookOpenIcon class="w-6 h-6 text-indigo-600" />
                  核心理念
                </h3>
                <p class="text-slate-700 leading-relaxed">
                  RAGAS (RAG Assessment) 是一个无需人工标注（Ground Truth 可选）的评估框架。它利用强大的 LLM（如 GPT-4）来评估 RAG 系统的各个中间环节。
                </p>
             </div>

             <div class="bg-white/80 rounded-2xl p-6 border border-slate-200 shadow-sm">
                <h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                   <ArrowPathIcon class="w-5 h-5 text-slate-500" />
                   评估流程
                </h3>
                <div class="flex items-center justify-between text-sm text-slate-600">
                  <div class="flex flex-col items-center gap-2">
                    <div class="w-16 h-10 bg-slate-100 rounded flex items-center justify-center border border-slate-300">Query</div>
                  </div>
                  <div class="h-0.5 w-8 bg-slate-300"></div>
                  <div class="flex flex-col items-center gap-2">
                    <div class="w-16 h-10 bg-blue-100 rounded flex items-center justify-center border border-blue-300 text-blue-800">Context</div>
                    <span class="text-xs text-blue-600">Retrieval</span>
                  </div>
                  <div class="h-0.5 w-8 bg-slate-300"></div>
                  <div class="flex flex-col items-center gap-2">
                    <div class="w-16 h-10 bg-violet-100 rounded flex items-center justify-center border border-violet-300 text-violet-800">Answer</div>
                    <span class="text-xs text-violet-600">Generation</span>
                  </div>
                   <div class="h-0.5 w-8 bg-slate-300"></div>
                  <div class="flex flex-col items-center gap-2">
                    <div class="w-16 h-10 bg-amber-100 rounded flex items-center justify-center border border-amber-300 text-amber-800">Score</div>
                    <span class="text-xs text-amber-600">RAGAS</span>
                  </div>
                </div>
             </div>
          </div>

          <!-- Right: Key Metrics -->
          <div class="space-y-4">
            <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2 mb-2">
              <BeakerIcon class="w-6 h-6 text-emerald-600" />
              四大核心指标
            </h3>
            
            <div class="grid grid-cols-1 gap-4">
              <!-- Metric 1 -->
              <div class="flex gap-4 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <div class="mt-1">
                  <CheckBadgeIcon class="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 class="font-bold text-slate-800">Faithfulness (忠实度)</h4>
                  <p class="text-sm text-slate-600 mt-1">
                    <span class="bg-emerald-200 text-emerald-800 text-xs px-1.5 py-0.5 rounded font-mono">Generation</span>
                    回答是否包含了凭空捏造的信息？确保回答必须基于检索到的上下文。
                  </p>
                </div>
              </div>

              <!-- Metric 2 -->
              <div class="flex gap-4 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <div class="mt-1">
                  <CheckBadgeIcon class="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 class="font-bold text-slate-800">Answer Relevance (回答相关性)</h4>
                  <p class="text-sm text-slate-600 mt-1">
                    <span class="bg-emerald-200 text-emerald-800 text-xs px-1.5 py-0.5 rounded font-mono">Generation</span>
                    生成的回答是否针对了用户的问题？避免答非所问。
                  </p>
                </div>
              </div>

              <!-- Metric 3 -->
              <div class="flex gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                <div class="mt-1">
                  <CheckBadgeIcon class="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 class="font-bold text-slate-800">Context Precision (上下文精确度)</h4>
                  <p class="text-sm text-slate-600 mt-1">
                     <span class="bg-blue-200 text-blue-800 text-xs px-1.5 py-0.5 rounded font-mono">Retrieval</span>
                    检索到的 Top-K 文档中，有用信息的密度如何？
                  </p>
                </div>
              </div>

              <!-- Metric 4 -->
              <div class="flex gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                <div class="mt-1">
                  <CheckBadgeIcon class="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 class="font-bold text-slate-800">Context Recall (上下文召回率)</h4>
                  <p class="text-sm text-slate-600 mt-1">
                     <span class="bg-blue-200 text-blue-800 text-xs px-1.5 py-0.5 rounded font-mono">Retrieval</span>
                     是否检索到了回答问题所需的所有关键信息？需要 Ground Truth 支持。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </Section>
</template>
