<script setup lang="ts">
import Section from '@/shared/ui/Section.vue'
import Card from '@/shared/ui/Card.vue'
import HeadingGradient from '@/shared/ui/HeadingGradient.vue'
import { ShieldCheckIcon, LockClosedIcon, EyeSlashIcon, NoSymbolIcon } from '@heroicons/vue/24/solid'

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
            RAG 安全与合规
          </HeadingGradient>
          <p class="mt-4 text-lg text-slate-600 max-w-4xl mx-auto">
            在企业级应用中，安全性是不可逾越的红线。
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Security 1: Data Privacy -->
          <div class="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-start gap-4">
              <div class="p-3 bg-red-50 rounded-lg shrink-0">
                 <LockClosedIcon class="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-800 mb-2">数据隐私与权限 (Data Privacy)</h3>
                <p class="text-sm text-slate-600 mb-3">防止敏感数据泄露给无权限的用户。</p>
                <ul class="space-y-1.5 text-sm text-slate-700">
                    <li class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                        <span>PII Redaction (敏感信息脱敏)</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                        <span>RBAC (基于角色的访问控制)：检索时过滤无权访问的文档</span>
                    </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Security 2: Prompt Injection -->
          <div class="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-start gap-4">
              <div class="p-3 bg-orange-50 rounded-lg shrink-0">
                 <ShieldCheckIcon class="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-800 mb-2">提示注入防御 (Prompt Injection)</h3>
                <p class="text-sm text-slate-600 mb-3">防止恶意用户通过特殊指令绕过系统限制。</p>
                <ul class="space-y-1.5 text-sm text-slate-700">
                    <li class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                        <span>输入过滤与清洗 (Input Sanitization)</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                        <span>System Prompt 强化</span>
                    </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Security 3: Hallucination -->
          <div class="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
             <div class="flex items-start gap-4">
              <div class="p-3 bg-violet-50 rounded-lg shrink-0">
                 <EyeSlashIcon class="w-6 h-6 text-violet-500" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-800 mb-2">幻觉控制 (Hallucination)</h3>
                <p class="text-sm text-slate-600 mb-3">减少模型一本正经胡说八道的风险。</p>
                <ul class="space-y-1.5 text-sm text-slate-700">
                    <li class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-violet-400 rounded-full"></span>
                        <span>Grounding Check (事实核查)</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-violet-400 rounded-full"></span>
                        <span>Citation (引用来源标注)</span>
                    </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Security 4: Content Safety -->
          <div class="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
             <div class="flex items-start gap-4">
              <div class="p-3 bg-slate-100 rounded-lg shrink-0">
                 <NoSymbolIcon class="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-800 mb-2">内容合规 (Content Safety)</h3>
                <p class="text-sm text-slate-600 mb-3">避免生成有害、歧视或不当内容。</p>
                <ul class="space-y-1.5 text-sm text-slate-700">
                    <li class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                        <span>Content Moderation API (内容审查)</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                        <span>输出拦截机制</span>
                    </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Card>
  </Section>
</template>
