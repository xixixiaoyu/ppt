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
            设计语言模板（示例）
          </h1>
          <p class="mt-5 text-lg md:text-2xl text-slate-700">
            多版式、可重用、含交互与 SVG 动效的中文演示模板
          </p>
          <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent px-6 py-3 text-white shadow-lg transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/50"
            >
              立即开始
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <span
              class="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur-md"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                class="opacity-70"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M8 12h8M12 8v8" />
              </svg>
              示例模板，仅用于演示结构
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
