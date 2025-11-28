<script setup lang="ts">
import Section from '@/shared/ui/Section.vue'
import Card from '@/shared/ui/Card.vue'
import HeadingGradient from '@/shared/ui/HeadingGradient.vue'
import {
  ShieldCheckIcon,
  LockClosedIcon,
  CpuChipIcon,
  LifebuoyIcon,
  ExclamationTriangleIcon,
  CheckBadgeIcon,
} from '@heroicons/vue/24/solid'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()
</script>

<template>
  <Section>
    <Card padding="xl" class="grid place-items-center h-full">
      <div class="relative z-10 px-6 py-4 w-full max-w-7xl h-full flex flex-col">
        <!-- Header -->
        <div class="text-center mb-8 shrink-0">
          <HeadingGradient
            :level="2"
            size="5xl"
            palette="indigo-fuchsia-emerald"
            class="leading-tight"
          >
            可信赖的工程化治理
          </HeadingGradient>
          <p class="mt-3 text-lg text-slate-600 max-w-4xl mx-auto">
            Trustworthy Engineering: 在概率性模型之上构建安全、可靠的确定性系统
          </p>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow min-h-0">
          <!-- Column 1: Safety & Security (The Shield) -->
          <div class="bg-red-50/50 rounded-2xl p-6 border border-red-100 flex flex-col gap-4">
            <div class="flex items-center gap-3 mb-2">
              <div class="p-2 bg-red-100 rounded-lg">
                <ShieldCheckIcon class="w-6 h-6 text-red-600" />
              </div>
              <h3 class="text-xl font-bold text-red-900">安全与合规 (Safety & Security)</h3>
            </div>

            <!-- Item 1.1 -->
            <div class="bg-white p-4 rounded-xl border border-red-100 shadow-sm">
              <div class="flex items-start gap-3">
                <LockClosedIcon class="w-5 h-5 text-red-500 mt-1 shrink-0" />
                <div>
                  <h4 class="font-bold text-slate-800">数据隐私 (Privacy)</h4>
                  <p class="text-sm text-slate-600 mb-2">防止敏感数据泄露。</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-md font-medium"
                      >PII 脱敏</span
                    >
                    <span class="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-md font-medium"
                      >RBAC 权限控制</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Item 1.2 -->
            <div class="bg-white p-4 rounded-xl border border-red-100 shadow-sm">
              <div class="flex items-start gap-3">
                <ExclamationTriangleIcon class="w-5 h-5 text-orange-500 mt-1 shrink-0" />
                <div>
                  <h4 class="font-bold text-slate-800">攻防对抗 (Adversarial)</h4>
                  <p class="text-sm text-slate-600 mb-2">防御提示注入与恶意指令。</p>
                  <div class="flex flex-wrap gap-2">
                    <span
                      class="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-md font-medium"
                      >输入清洗</span
                    >
                    <span
                      class="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-md font-medium"
                      >System Prompt 强化</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Item 1.3 -->
            <div class="bg-white p-4 rounded-xl border border-red-100 shadow-sm">
              <div class="flex items-start gap-3">
                <CheckBadgeIcon class="w-5 h-5 text-pink-500 mt-1 shrink-0" />
                <div>
                  <h4 class="font-bold text-slate-800">内容风控 (Content Safety)</h4>
                  <p class="text-sm text-slate-600 mb-2">拦截有害、歧视或不当输出。</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-2 py-1 bg-pink-50 text-pink-700 text-xs rounded-md font-medium"
                      >Moderation API</span
                    >
                    <span class="px-2 py-1 bg-pink-50 text-pink-700 text-xs rounded-md font-medium"
                      >输出拦截</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Column 2: Reliability & Engineering (The Engine) -->
          <div class="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 flex flex-col gap-4">
            <div class="flex items-center gap-3 mb-2">
              <div class="p-2 bg-blue-100 rounded-lg">
                <CpuChipIcon class="w-6 h-6 text-blue-600" />
              </div>
              <h3 class="text-xl font-bold text-blue-900">可靠性工程 (Reliability)</h3>
            </div>

            <!-- Item 2.1 -->
            <div class="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
              <div class="flex items-start gap-3">
                <LifebuoyIcon class="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                <div>
                  <h4 class="font-bold text-slate-800">幻觉抑制 (Hallucination)</h4>
                  <p class="text-sm text-slate-600 mb-2">减少一本正经的胡说八道。</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium"
                      >RAG 事实核查</span
                    >
                    <span class="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium"
                      >引用溯源 (Citation)</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Item 2.2 -->
            <div class="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
              <div class="flex items-start gap-3">
                <CpuChipIcon class="w-5 h-5 text-indigo-500 mt-1 shrink-0" />
                <div>
                  <h4 class="font-bold text-slate-800">确定性保障 (Determinism)</h4>
                  <p class="text-sm text-slate-600 mb-2">应对非确定性输出与指令失效。</p>
                  <div class="flex flex-wrap gap-2">
                    <span
                      class="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-md font-medium"
                      >Defensive Prompting</span
                    >
                    <span
                      class="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-md font-medium"
                      >结构化输出 (JSON)</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Item 2.3 -->
            <div class="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
              <div class="flex items-start gap-3">
                <ShieldCheckIcon class="w-5 h-5 text-cyan-500 mt-1 shrink-0" />
                <div>
                  <h4 class="font-bold text-slate-800">兜底机制 (Fallback)</h4>
                  <p class="text-sm text-slate-600 mb-2">当模型失效时的降级策略。</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs rounded-md font-medium"
                      >Human-in-the-loop</span
                    >
                    <span class="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs rounded-md font-medium"
                      >规则引擎兜底</span
                    >
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
