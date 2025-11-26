<script setup lang="ts">
import Section from '@/shared/ui/Section.vue'
import Card from '@/shared/ui/Card.vue'
import HeadingGradient from '@/shared/ui/HeadingGradient.vue'
defineProps<{ isActive?: boolean; isPreview?: boolean }>()
</script>

<template>
  <Section>
    <Card padding="xl" class="grid place-items-center">
      <div class="absolute inset-0 -z-0 opacity-40">
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
              <feGaussianBlur stdDeviation="40" edgeMode="duplicate" />
            </filter>
          </defs>
          <g filter="url(#blur)">
            <circle cx="160" cy="120" r="120" fill="url(#g1)" />
            <circle cx="640" cy="480" r="160" fill="url(#g1)" opacity="0.7" />
          </g>
        </svg>
      </div>

      <div class="relative z-10 px-6 py-4 md:py-8 w-full">
        <div class="text-center">
          <HeadingGradient
            :level="1"
            size="6xl"
            palette="indigo-fuchsia-emerald"
            class="leading-tight"
          >
            大模型基本原理
          </HeadingGradient>
          <p class="mt-4 text-lg md:text-xl text-slate-600 max-w-4xl mx-auto">
            大语言模型的核心是 Transformer
            架构，它通过“自注意力机制”理解上下文，捕捉长距离依赖关系。
          </p>
        </div>

        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div class="bg-white/50 rounded-lg p-6">
            <h3 class="text-xl font-semibold text-slate-800">自注意力机制 (Self-Attention)</h3>
            <p class="mt-2 text-slate-600">
              模型在处理一个词时，能够同时关注输入序列中的所有其他词，并计算它们之间的相关性权重。这使得模型能更好地理解语法、语义和上下文。
            </p>
          </div>
          <div class="bg-white/50 rounded-lg p-6">
            <h3 class="text-xl font-semibold text-slate-800">
              前馈神经网络 (Feed-Forward Network)
            </h3>
            <p class="mt-2 text-slate-600">
              在自注意力机制帮模型理解了词与词之间的关系后，前馈神经网络会接着对每个词进行一次‘深度加工’。这个过程好比我们的大脑在初步理解一句话后，再进行深入思考，从而捕捉到更丰富的含义。
            </p>
          </div>
        </div>
      </div>
    </Card>
  </Section>
</template>
