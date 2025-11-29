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
      <div class="absolute inset-0 -z-0 opacity-20 pointer-events-none">
        <svg
          class="h-full w-full"
          viewBox="0 0 800 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grid-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" style="stop-color: rgb(var(--accent) / 0.2)" />
              <stop offset="100%" style="stop-color: transparent" />
            </linearGradient>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="url(#grid-grad)"
                stroke-width="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div
        class="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-8 h-full justify-center"
      >
        <!-- 标题 -->
        <div class="text-center">
          <HeadingGradient
            :level="2"
            size="5xl"
            palette="indigo-fuchsia-emerald"
            class="font-bold tracking-tight"
          >
            Embedding 与向量数据库
          </HeadingGradient>
          <p class="mt-4 text-xl text-slate-600 max-w-3xl mx-auto font-medium">
            RAG 的基石：让计算机理解语言的“语义距离”
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <!-- 左侧：Embedding 概念 -->
          <div
            class="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-white/50 shadow-lg flex flex-col gap-6"
          >
            <div class="flex items-center gap-4">
              <div class="p-3 bg-indigo-100 rounded-xl text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-slate-800">
                什么是 Embedding?
              </h3>
            </div>

            <p class="text-slate-600 leading-relaxed text-lg">
              Embedding
              是将离散的文本（如单词、句子）映射到连续的<strong>高维向量空间</strong>的过程。
            </p>

            <div
              class="bg-slate-800 rounded-xl p-5 font-mono text-sm text-blue-200 shadow-inner"
            >
              <div class="flex gap-4 mb-2 border-b border-slate-700 pb-2">
                <span class="text-emerald-400">"苹果"</span>
                <span>→</span>
                <span>[0.12, -0.45, 0.88, ...]</span>
              </div>
              <div class="flex gap-4">
                <span class="text-emerald-400">"香蕉"</span>
                <span>→</span>
                <span>[0.15, -0.42, 0.85, ...]</span>
              </div>
            </div>

            <div class="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
              <h4 class="font-bold text-indigo-900 mb-2">
                💡 核心特性：语义距离
              </h4>
              <p class="text-sm text-indigo-800">
                在向量空间中，<strong>语义相似</strong>的词距离更近，而不相关的词距离更远。比如“猫”和“狗”的距离远小于“猫”和“汽车”。
              </p>
            </div>
          </div>

          <!-- 右侧：向量数据库 -->
          <div
            class="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-white/50 shadow-lg flex flex-col gap-6"
          >
            <div class="flex items-center gap-4">
              <div class="p-3 bg-fuchsia-100 rounded-xl text-fuchsia-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-slate-800">
                向量数据库 (Vector DB)
              </h3>
            </div>

            <p class="text-slate-600 leading-relaxed text-lg">
              传统数据库擅长精确匹配（WHERE
              id=1），而向量数据库擅长<strong>模糊匹配</strong>（找最相似的
              Top-K）。
            </p>

            <div class="grid grid-cols-2 gap-4">
              <div
                class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center"
              >
                <div class="text-2xl mb-1">🔍</div>
                <div class="font-bold text-slate-700">ANN 搜索</div>
                <div class="text-xs text-slate-500">近似最近邻检索</div>
              </div>
              <div
                class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center"
              >
                <div class="text-2xl mb-1">⚡️</div>
                <div class="font-bold text-slate-700">极速响应</div>
                <div class="text-xs text-slate-500">亿级数据毫秒响应</div>
              </div>
            </div>

            <div class="mt-auto">
              <h4
                class="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wider"
              >
                常见工具
              </h4>
              <div class="flex flex-wrap gap-2">
                <span
                  class="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium"
                  >Pinecone</span
                >
                <span
                  class="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium"
                  >Milvus</span
                >
                <span
                  class="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium"
                  >Chroma</span
                >
                <span
                  class="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium"
                  >pgvector</span
                >
                <span
                  class="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium"
                  >Weaviate</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- 底部可视化 -->
        <div
          class="bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/30 flex items-center justify-center gap-12 text-slate-700"
        >
          <div class="flex flex-col items-center">
            <div class="text-3xl mb-2">🤴</div>
            <span class="font-bold">King</span>
          </div>
          <div class="text-2xl font-bold text-slate-400">-</div>
          <div class="flex flex-col items-center">
            <div class="text-3xl mb-2">👨</div>
            <span class="font-bold">Man</span>
          </div>
          <div class="text-2xl font-bold text-slate-400">+</div>
          <div class="flex flex-col items-center">
            <div class="text-3xl mb-2">👩</div>
            <span class="font-bold">Woman</span>
          </div>
          <div class="text-2xl font-bold text-slate-400">≈</div>
          <div class="flex flex-col items-center">
            <div class="text-3xl mb-2">👸</div>
            <span class="font-bold text-fuchsia-600">Queen</span>
          </div>
        </div>
      </div>
    </Card>
  </Section>
</template>
