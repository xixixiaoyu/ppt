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
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="g-limits" x1="0" y1="0" x2="1" y2="1">
              <stop
                offset="0%"
                :style="{ stopColor: 'rgb(var(--accent) / 0.2)' }"
              />
              <stop
                offset="100%"
                :style="{ stopColor: 'rgb(var(--accent) / 0.05)' }"
              />
            </linearGradient>
            <filter
              id="blur-limits"
              filterUnits="userSpaceOnUse"
              x="-200"
              y="-200"
              width="1200"
              height="1000"
              color-interpolation-filters="sRGB"
            >
              <feGaussianBlur stdDeviation="60" edgeMode="duplicate" />
            </filter>
          </defs>
          <g filter="url(#blur-limits)">
            <rect
              x="100"
              y="100"
              width="600"
              height="400"
              rx="200"
              fill="url(#g-limits)"
            />
          </g>
        </svg>
      </div>

      <div
        class="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-8 h-full justify-center"
      >
        <!-- 标题区域 -->
        <div class="text-center space-y-3">
          <HeadingGradient
            :level="1"
            size="5xl"
            palette="indigo-fuchsia-emerald"
            class="leading-tight font-bold tracking-tight"
          >
            局限与破局：大模型的阿喀琉斯之踵
          </HeadingGradient>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
            认清边界，善用工具，方能驾驭 AI
          </p>
        </div>

        <!-- 核心内容区 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <!-- 左侧：核心局限 -->
          <div
            class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-red-100 shadow-sm flex flex-col gap-4 relative overflow-hidden"
          >
            <div class="absolute top-0 left-0 w-1 h-full bg-red-400/50"></div>
            <h2
              class="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-2"
            >
              <span class="text-red-500">⚠️</span> 核心局限 (Limitations)
            </h2>

            <ul class="space-y-4 flex-1">
              <li class="flex gap-3">
                <span class="text-2xl shrink-0">🤥</span>
                <div>
                  <h3 class="font-bold text-slate-800">
                    幻觉 (Hallucinations)
                  </h3>
                  <p class="text-slate-600 text-sm">
                    一本正经地胡说八道，生成看似合理但完全错误的内容。
                  </p>
                </div>
              </li>
              <li class="flex gap-3">
                <span class="text-2xl shrink-0">📅</span>
                <div>
                  <h3 class="font-bold text-slate-800">时效性滞后</h3>
                  <p class="text-slate-600 text-sm">
                    知识停留在训练截止日期，不知道“今天”发生的新闻。
                  </p>
                </div>
              </li>
              <li class="flex gap-3">
                <span class="text-2xl shrink-0">📝</span>
                <div>
                  <h3 class="font-bold text-slate-800">上下文限制</h3>
                  <p class="text-slate-600 text-sm">
                    记忆窗口有限，无法一次性处理超长书籍或整个项目代码。
                  </p>
                </div>
              </li>
              <li class="flex gap-3">
                <span class="text-2xl shrink-0">🧮</span>
                <div>
                  <h3 class="font-bold text-slate-800">复杂逻辑短板</h3>
                  <p class="text-slate-600 text-sm">
                    即使是最强模型，在多步数学计算和严密逻辑推理上仍会犯错。
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <!-- 右侧：最佳解法 -->
          <div
            class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-green-100 shadow-sm flex flex-col gap-4 relative overflow-hidden"
          >
            <div class="absolute top-0 left-0 w-1 h-full bg-green-500/50"></div>
            <h2
              class="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-2"
            >
              <span class="text-green-600">💡</span> 最佳解法 (Solutions)
            </h2>

            <ul class="space-y-4 flex-1">
              <li class="flex gap-3">
                <span class="text-2xl shrink-0">📚</span>
                <div>
                  <h3 class="font-bold text-slate-800">RAG (检索增强生成)</h3>
                  <p class="text-slate-600 text-sm">
                    <span class="text-green-700 font-semibold">外挂知识库</span
                    >。让 AI 像开卷考试一样，先查资料再回答，解决幻觉和时效性。
                  </p>
                </div>
              </li>
              <li class="flex gap-3">
                <span class="text-2xl shrink-0">🛠️</span>
                <div>
                  <h3 class="font-bold text-slate-800">
                    Function Calling / Tools
                  </h3>
                  <p class="text-slate-600 text-sm">
                    <span class="text-green-700 font-semibold">使用工具</span
                    >。把计算交给计算器，把搜索交给搜索引擎，补齐能力短板。
                  </p>
                </div>
              </li>
              <li class="flex gap-3">
                <span class="text-2xl shrink-0">⛓️</span>
                <div>
                  <h3 class="font-bold text-slate-800">
                    Prompt Engineering (CoT)
                  </h3>
                  <p class="text-slate-600 text-sm">
                    <span class="text-green-700 font-semibold">思维链提示</span
                    >。引导 AI "Step-by-step" 思考，显著提升推理准确率。
                  </p>
                </div>
              </li>
              <li class="flex gap-3">
                <span class="text-2xl shrink-0">🎯</span>
                <div>
                  <h3 class="font-bold text-slate-800">Fine-tuning (微调)</h3>
                  <p class="text-slate-600 text-sm">
                    <span class="text-green-700 font-semibold">专家模式</span
                    >。注入领域特定数据，让通用模型变成行业专家。
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  </Section>
</template>
