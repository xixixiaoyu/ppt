<script setup lang="ts">
import Section from '@/shared/ui/Section.vue'
import Card from '@/shared/ui/Card.vue'
import HeadingGradient from '@/shared/ui/HeadingGradient.vue'
import { BeakerIcon, CpuChipIcon } from '@heroicons/vue/24/outline'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const methods = [
  {
    title: '全量微调 (Full Fine-Tuning)',
    desc: '更新模型的所有参数。如同重新修读所有课程。',
    pros: '潜力最大，效果可能最好',
    cons: '资源消耗极大，容易遗忘原有知识 (Catastrophic Forgetting)',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    icon: CpuChipIcon,
  },
  {
    title: '参数高效微调 (PEFT)',
    desc: '冻结大部分参数，仅调整少量参数 (如 LoRA, P-Tuning)。如同只修读特定选修课。',
    pros: '极低成本，训练快，消费级显卡可用',
    cons: '在极度复杂的任务上可能不如全量',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    icon: BeakerIcon,
  },
]

const steps = [
  {
    step: '01',
    title: '数据准备',
    desc: '构建高质量的问答对 (Prompt-Completion Pairs)',
  },
  {
    step: '02',
    title: '选择基座',
    desc: '选择合适的开源模型 (如 Llama 3, Qwen, Baichuan)',
  },
  {
    step: '03',
    title: '微调训练',
    desc: '使用 LoRA 等技术进行训练，监控 Loss 下降',
  },
  {
    step: '04',
    title: '评估部署',
    desc: '使用测试集评估效果，导出模型权重并部署',
  },
]
</script>

<template>
  <Section>
    <Card padding="xl" class="grid place-items-center">
      <div class="relative z-10 px-6 py-4 md:py-8 w-full max-w-6xl">
        <div class="text-center mb-10">
          <HeadingGradient
            :level="2"
            size="5xl"
            palette="indigo-fuchsia-emerald"
            class="leading-tight"
          >
            大模型微调 (Fine-Tuning)
          </HeadingGradient>
          <p class="mt-4 text-lg md:text-xl text-slate-600 max-w-4xl mx-auto">
            将通用的“博学家”训练成特定领域的“专家”。通过特定数据投喂，调整模型权重，使其掌握垂直领域的知识、风格或任务模式。
          </p>
        </div>

        <!-- Methods Comparison -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div
            v-for="method in methods"
            :key="method.title"
            class="p-6 rounded-xl border transition-all duration-300 hover:shadow-lg"
            :class="[method.bg, method.border]"
          >
            <div class="flex items-center gap-4 mb-4">
              <component
                :is="method.icon"
                class="w-8 h-8"
                :class="method.color"
              />
              <h3 class="text-xl font-bold text-slate-800">
                {{ method.title }}
              </h3>
            </div>
            <p class="text-slate-600 mb-4">{{ method.desc }}</p>
            <div class="space-y-2 text-sm">
              <div class="flex gap-2">
                <span class="font-bold text-slate-700 shrink-0">优势:</span>
                <span class="text-slate-600">{{ method.pros }}</span>
              </div>
              <div class="flex gap-2">
                <span class="font-bold text-slate-700 shrink-0">劣势:</span>
                <span class="text-slate-600">{{ method.cons }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Workflow -->
        <div class="relative">
          <div
            class="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 hidden md:block z-0"
          ></div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            <div
              v-for="step in steps"
              :key="step.step"
              class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform"
            >
              <div class="text-3xl font-black text-slate-100 mb-2">
                {{ step.step }}
              </div>
              <h4 class="text-lg font-bold text-slate-800 mb-1">
                {{ step.title }}
              </h4>
              <p class="text-sm text-slate-500">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </Section>
</template>
