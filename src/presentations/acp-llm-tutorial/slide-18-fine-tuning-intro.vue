<script setup lang="ts">
import { BookOpenIcon, CpuChipIcon, SparklesIcon } from '@heroicons/vue/24/outline'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const comparison = {
  rag: {
    title: 'RAG (知识密集型任务)',
    features: [
      '核心思想：外挂知识库，即时查询',
      '优点：知识更新快、成本低、可解释性强',
      '适用场景：客服问答、文档总结、知识检索',
    ],
    color: 'fuchsia',
  },
  finetuning: {
    title: 'Fine-tuning (行为/风格/格式)',
    features: [
      '核心思想：修改模型权重，内化特定行为',
      '优点：改变模型底层行为、遵循复杂指令、统一输出风格',
      '适用场景：模仿特定写作风格、输出严格的 JSON 格式、提升特定任务（如分类）的准确率',
    ],
    color: 'indigo',
  },
}

const steps = [
  {
    icon: BookOpenIcon,
    title: '1. 准备指令数据集',
    description: '构建高质量的 `instruction -> output` 数据对，精确描述你希望模型学习的行为。',
  },
  {
    icon: CpuChipIcon,
    title: '2. 应用 PEFT (如 LoRA)',
    description:
      '冻结原始模型大部分权重，仅在其中插入少量（~0.1%）可训练的“适配器”层 (Adapter)。训练过程只更新适配器参数。',
    highlight: true,
  },
  {
    icon: SparklesIcon,
    title: '3. 获得适配器并部署',
    description:
      '训练结果是一个轻量的适配器文件 (LoRA weights)，在部署时加载到基础模型之上，即可生效。',
  },
]

const useCases = [
  '模仿特定风格：让模型说话像公司 CEO，或写出符合品牌语调的文案。',
  '遵循复杂格式：稳定输出特定、复杂的 JSON 或 XML 结构，即使通过 Prompt 难以约束。',
  '掌握新技能：提升模型在特定任务上的表现，如代码生成、特定领域的分类任务。',
  '纠正不良行为：系统性地减少模型在特定场景下的“幻觉”或有害输出。',
  '优化调用工具的行为：让模型更可靠地使用你定义的工具 (Function Calling)。',
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="text-center mb-8">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
      >
        模型微调：改变模型行为的“外科手术”
      </h2>
      <p class="mt-2 text-slate-600 max-w-3xl mx-auto">
        微调不为灌输知识，而为“塑造性格”。它成本高昂，是优化链路的最后选择。
      </p>
    </div>

    <div class="w-full max-w-6xl mx-auto space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="item in comparison"
          :key="item.title"
          class="bg-white/70 backdrop-blur-md p-6 border border-slate-200/30 rounded-3xl shadow-xl"
        >
          <h3 class="font-bold text-lg mb-2" :class="`text-${item.color}-700`">{{ item.title }}</h3>
          <ul class="space-y-1.5 text-sm text-slate-700">
            <li v-for="feature in item.features" :key="feature" class="flex items-start gap-2">
              <svg
                class="w-4 h-4 mt-0.5 flex-shrink-0"
                :class="`text-${item.color}-500`"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                  d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
                />
              </svg>
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="step in steps"
          :key="step.title"
          class="bg-white/70 backdrop-blur-md p-6 border border-slate-200/30 rounded-3xl shadow-xl text-center transition hover:-translate-y-0.5"
          :class="{ 'ring-2 ring-indigo-500/50': step.highlight }"
        >
          <div class="flex justify-center mb-3">
            <component :is="step.icon" class="h-10 w-10 text-indigo-500" />
          </div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">{{ step.title }}</h3>
          <p class="text-slate-700 text-sm">{{ step.description }}</p>
        </div>
      </div>
    </div>

    <div class="mt-10 w-full max-w-6xl mx-auto">
      <div
        class="bg-white/70 backdrop-blur-md p-6 border border-slate-200/30 rounded-3xl shadow-xl"
      >
        <h3 class="text-xl font-bold text-slate-900 mb-3">何时应该考虑微调？(决策清单)</h3>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm text-slate-700">
          <li v-for="item in useCases" :key="item" class="flex items-start gap-2">
            <svg
              class="w-4 h-4 text-emerald-500 flex-shrink-0 mt-1"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.286.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
              />
            </svg>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
