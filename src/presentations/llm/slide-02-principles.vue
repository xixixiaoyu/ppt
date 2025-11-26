<script setup lang="ts">
import Section from '@/shared/ui/Section.vue'
import Card from '@/shared/ui/Card.vue'
import HeadingGradient from '@/shared/ui/HeadingGradient.vue'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()
</script>

<template>
  <Section>
    <Card padding="xl" class="grid place-items-center relative overflow-hidden">
      <!-- 背景装饰 -->
      <div class="absolute inset-0 -z-0 opacity-30 pointer-events-none">
        <svg
          class="h-full w-full"
          viewBox="0 0 800 600"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" :style="{ stopColor: 'rgb(var(--accent) / 0.30)' }" />
              <stop offset="100%" :style="{ stopColor: 'rgb(var(--accent) / 0.12)' }" />
            </linearGradient>
            <filter
              id="blur"
              filterUnits="userSpaceOnUse"
              x="-200"
              y="-200"
              width="1200"
              height="1000"
              color-interpolation-filters="sRGB"
            >
              <feGaussianBlur stdDeviation="50" edgeMode="duplicate" />
            </filter>
          </defs>
          <g filter="url(#blur)">
            <circle cx="200" cy="150" r="150" fill="url(#g1)" />
            <circle cx="600" cy="450" r="180" fill="url(#g1)" opacity="0.6" />
          </g>
        </svg>
      </div>

      <div class="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-8 h-full justify-center">
        <!-- 标题区域 -->
        <div class="text-center space-y-4">
          <HeadingGradient
            :level="1"
            size="5xl"
            palette="indigo-fuchsia-emerald"
            class="leading-tight font-bold tracking-tight"
          >
            大模型基本原理
          </HeadingGradient>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
            从 Transformer 架构到“智能”的本质探讨
          </p>
        </div>

        <!-- 核心机制 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            class="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span class="text-indigo-500">01.</span> 自注意力机制 (Self-Attention)
            </h3>
            <p class="mt-3 text-slate-600 leading-relaxed text-sm">
              想象你在阅读长句时，为了理解“它”指代什么，会下意识回顾前文。模型也是如此：它计算输入序列中每个词与其他词的<strong>关联权重</strong>，从而捕捉长距离的依赖关系和丰富的上下文语境。
            </p>
          </div>

          <div
            class="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span class="text-fuchsia-500">02.</span> 前馈神经网络 (Feed-Forward)
            </h3>
            <p class="mt-3 text-slate-600 leading-relaxed text-sm">
              如果 Attention 是“感知”上下文，那么 FFN 就是“消化”信息。它是一个巨大的记忆网络，对
              Attention
              提取的特征进行<strong>非线性变换和加工</strong>，将这些关联信息转化为更深层的语义表示。
            </p>
          </div>
        </div>

        <!-- 哲学思考：中文房间 -->
        <div
          class="bg-slate-50/80 backdrop-blur-md rounded-xl p-6 border border-slate-200 shadow-inner"
        >
          <div class="flex flex-col md:flex-row gap-6 items-start">
            <div class="flex-1">
              <h3 class="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                <span class="text-2xl">🏛️</span> 中文房间实验 (The Chinese Room)
              </h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                这是哲学家约翰·希尔勒提出的思想实验：想象一个不懂中文的人关在房间里，凭借一本极其详尽的“规则书”（类似模型的参数），将递进来的中文符号转化为正确的中文回复。
              </p>
            </div>
            <div
              class="flex-1 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6"
            >
              <p class="text-slate-700 text-sm font-medium italic mb-2">
                “房间里的人真的‘懂’中文吗？”
              </p>
              <p class="text-slate-600 text-sm leading-relaxed">
                这个实验揭示了<strong>语法 (Syntax)</strong> 与
                <strong>语义 (Semantics)</strong> 的区别。目前的 LLM
                是否只是在进行极其复杂的“符号操纵”，而没有产生真正的意识或理解？这至今仍是 AI
                领域最迷人的未解之谜。
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </Section>
</template>
