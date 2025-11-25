<script setup lang="ts">
import {
  CheckBadgeIcon,
  DocumentMagnifyingGlassIcon,
  MagnifyingGlassCircleIcon,
  ArrowsPointingInIcon,
  CpuChipIcon,
  BeakerIcon,
  ScaleIcon,
} from '@heroicons/vue/24/outline'
import Section from '@/shared/ui/Section.vue'
import Card from '@/shared/ui/Card.vue'
import HeadingGradient from '@/shared/ui/HeadingGradient.vue'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const evaluationProcess = {
  title: '构建一个现代的 LLM 评估体系',
  steps: [
    {
      icon: ScaleIcon,
      title: '1. 定义评估维度与构建评估集',
      description:
        '明确“好”的标准：是答案的忠实度、相关性，还是无害性？然后，构建一个包含“问题-标准答案-上下文”的黄金数据集 (Golden Set)，覆盖典型和边缘场景。',
      color: 'indigo',
    },
    {
      icon: CpuChipIcon,
      title: '2. 核心范式：LLM-as-a-Judge',
      description:
        '利用一个强大的外部 LLM (如 GPT-4) 作为“裁判”，根据你定义的标准（例如，简洁性、准确性），为模型的输出打分。这是目前最灵活、最接近人类判断的评估方式。',
      code: `
// 示例：使用 GPT-4 评估答案的相关性
prompt = f"""
[问题]: {question}
[模型回答]: {answer}

请根据以下评分标准，评估“模型回答”与“问题”的相关性，并仅输出一个数字分数：
1: 完全不相关
...
5: 非常相关
"""
score = gpt4.predict(prompt)
      `,
      color: 'fuchsia',
    },
    {
      icon: BeakerIcon,
      title: '3. 分层评估：从组件到端到端',
      description: '将评估分为两个层级，精确定位问题所在：',
      subpoints: [
        {
          name: '组件评估 (Unit Test)',
          detail: '针对 RAG 的特定环节，如检索器（Retriever）的上下文精度和召回率。',
        },
        {
          name: '端到端评估 (E2E Test)',
          detail: '评估最终生成给用户的答案质量，如忠实度、相关性和格式正确性。',
        },
      ],
      color: 'sky',
    },
  ],
}

const metrics = [
  {
    icon: ArrowsPointingInIcon,
    name: 'Context Recall (上下文召回率)',
    description: '组件评估：相关上下文中，有多少被成功检索？',
    level: 'component',
  },
  {
    icon: MagnifyingGlassCircleIcon,
    name: 'Context Precision (上下文精确度)',
    description: '组件评估：检索到的上下文中，有多少是相关的？',
    level: 'component',
  },
  {
    icon: CheckBadgeIcon,
    name: 'Faithfulness (忠实度)',
    description: '端到端评估：回答是否完全基于所提供的上下文。',
    level: 'e2e',
  },
  {
    icon: DocumentMagnifyingGlassIcon,
    name: 'Answer Relevancy (相关性)',
    description: '端到端评估：回答是否切中用户问题，且无冗余信息。',
    level: 'e2e',
  },
]

const frameworks = {
  title: '主流评测框架：你的“模型质检员”',
  items: ['Ragas', 'TruLens', 'DeepEval', 'LlamaIndex'],
  description:
    '这些工具内置了上述评估指标和 LLM-as-a-Judge 模式，提供了标准化的评测流程，是构建健壮 LLM 应用的得力助手。',
}
</script>

<template>
  <Section>
    <div class="text-center mb-12">
      <HeadingGradient :level="2" size="5xl"
        >LLM 应用效果评估：从“感觉不错”到“数据驱动”</HeadingGradient
      >
      <p class="mt-3 text-slate-600 max-w-3xl mx-auto">
        建立系统性的评估框架是保障 LLM 应用质量和持续迭代的基石。传统的 NLP
        指标已不足以胜任，我们需要新的范式。
      </p>
    </div>

    <div class="grid place-items-center">
      <div class="w-full max-w-6xl space-y-10">
        <!-- Evaluation Process -->
        <div>
          <h3 class="text-2xl font-bold text-slate-800 mb-6 text-center">
            {{ evaluationProcess.title }}
          </h3>
          <div class="space-y-6">
            <Card
              v-for="step in evaluationProcess.steps"
              :key="step.title"
              padding="md"
              class="transition hover:-translate-y-0.5"
            >
              <div class="flex items-start gap-4">
                <div :class="`bg-${step.color}-100 p-2 rounded-full`">
                  <component :is="step.icon" :class="`h-6 w-6 text-${step.color}-600`" />
                </div>
                <div>
                  <h4 class="text-lg font-bold text-slate-900">{{ step.title }}</h4>
                  <p class="text-slate-700 text-sm mt-1">{{ step.description }}</p>
                  <div v-if="step.code" class="my-3">
                    <div
                      class="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 shadow-inner text-xs"
                    >
                      <div class="px-4 py-2 border-b border-slate-600/80">
                        <span class="text-xs text-slate-400 font-mono">python</span>
                      </div>
                      <pre
                        class="language-python p-4 text-white/80"
                      ><code v-html="step.code.trim()"></code></pre>
                    </div>
                  </div>
                  <ul v-if="step.subpoints" class="mt-2 space-y-1 text-sm">
                    <li v-for="sub in step.subpoints" :key="sub.name">
                      <strong :class="`font-semibold text-sky-800`">{{ sub.name }}：</strong>
                      <span class="text-slate-600">{{ sub.detail }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <!-- Metrics -->
        <div>
          <h3 class="text-2xl font-bold text-slate-800 mb-6 text-center">核心评估指标</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card
              v-for="metric in metrics"
              :key="metric.name"
              padding="sm"
              class="transition hover:-translate-y-0.5"
            >
              <div class="flex items-center gap-3">
                <div
                  :class="metric.level === 'component' ? 'bg-sky-100' : 'bg-indigo-100'"
                  class="p-2 rounded-lg"
                >
                  <component
                    :is="metric.icon"
                    :class="metric.level === 'component' ? 'text-sky-600' : 'text-indigo-600'"
                    class="h-8 w-8"
                  />
                </div>
                <div>
                  <h4 class="font-bold text-slate-900 text-base">{{ metric.name }}</h4>
                  <p class="text-slate-700 text-sm mt-0.5">{{ metric.description }}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <!-- Frameworks -->
        <Card padding="md" class="text-center transition hover:-translate-y-0.5 bg-slate-50">
          <h3 class="text-xl font-bold text-slate-900 mb-3">{{ frameworks.title }}</h3>
          <div class="flex justify-center gap-x-8 gap-y-2 items-center flex-wrap">
            <span
              v-for="item in frameworks.items"
              :key="item"
              class="text-2xl font-mono text-slate-800 font-semibold"
              >{{ item }}</span
            >
          </div>
          <p class="mt-3 text-slate-600 text-sm max-w-2xl mx-auto">{{ frameworks.description }}</p>
        </Card>
      </div>
    </div>
  </Section>
</template>
