<script setup lang="ts">
const props = defineProps<{ isActive?: boolean; isPreview?: boolean }>()
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div
      class="relative overflow-hidden rounded-3xl border border-slate-200/30 bg-white/70 backdrop-blur-md shadow-2xl"
    >
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

      <div class="relative z-10 grid place-items-center px-6 py-16 md:py-24">
        <div class="text-center">
          <h1
            class="text-5xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400"
          >
            构建生产级大模型问答系统
          </h1>
          <p class="mt-5 text-lg md:text-2xl text-slate-700 max-w-4xl mx-auto">
            从入门到部署的全链路实践
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
