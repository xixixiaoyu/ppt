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

      <div class="relative z-10 px-6 py-4 md:py-8">
        <div class="text-center">
          <HeadingGradient
            :level="1"
            size="7xl"
            palette="indigo-fuchsia-emerald"
            class="leading-tight"
          >
            构建生产级大模型问答系统
          </HeadingGradient>
          <p class="mt-5 text-lg md:text-2xl text-slate-700 max-w-4xl mx-auto">
            从入门到部署的全链路实践
          </p>
          <p class="mt-3 text-sm md:text-base text-slate-600 max-w-4xl mx-auto">
            面向开发者的工程方法，也提供正确使用指南
          </p>
        </div>
      </div>
    </Card>
  </Section>
</template>
