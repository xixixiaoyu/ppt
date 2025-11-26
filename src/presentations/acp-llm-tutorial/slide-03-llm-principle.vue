<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const title = '大模型基本原理'
const principles = [
  {
    title: '核心架构',
    content: '基于 Transformer 架构，运用自注意力机制（Self-Attention）高效处理序列数据。',
  },
  {
    title: '预训练',
    content: '在海量文本数据上进行预训练，学习语言的深层统计规律与知识。',
  },
  {
    title: '微调',
    content: '通过在特定任务数据上进行微调，适配翻译、摘要、对话等多样化应用场景。',
  },
  {
    title: '规模效应',
    content: '模型参数规模越大，能力越强，并可能涌现出更复杂的推理能力。',
  },
  {
    title: '概率本质',
    content: '其本质是一个概率计算器，通过计算生成下一个词的概率分布来构建回应。',
  },
]

const trainingSteps = [
  '数据收集与清洗：从互联网、书籍等来源获取海量文本数据',
  '预训练：在通用语料上进行无监督学习，例如“完形填空”',
  '有监督微调：使用高质量的“指令-回答”数据对，让模型学会遵循指令',
  '奖励模型训练：人工对模型的多个回答进行排序，训练一个奖励模型',
  '强化学习微调：使用奖励模型作为强化学习的信号，让模型的输出更符合人类偏好',
  '评估与迭代：通过自动化和人工评估，发现模型的不足并持续改进',
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="max-w-4xl mx-auto">
      <div
        class="rounded-3xl border border-slate-200/30 bg-white/70 backdrop-blur-md shadow-2xl p-8 md:p-12 transition hover:-translate-y-0.5"
      >
        <h2
          class="text-3xl md:text-4xl leading-tight font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
        >
          {{ title }}
        </h2>
      </div>
    </div>

    <div class="mt-12 max-w-5xl mx-auto">
      <div
        class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-8"
      >
        <ul class="space-y-6">
          <li v-for="p in principles" :key="p.title" class="flex items-start">
            <div
              class="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 border border-slate-200/60 text-slate-600"
            >
              <div class="h-2.5 w-2.5 rounded-full bg-accent/80" />
            </div>
            <div class="ml-4">
              <h3 class="font-semibold text-slate-800 text-lg">
                {{ p.title }}
              </h3>
              <p class="text-slate-700 mt-1 leading-relaxed">
                {{ p.content }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-8 max-w-5xl mx-auto">
      <div
        class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6"
      >
        <h3 class="text-2xl font-bold text-slate-800 text-center mb-4">大模型训练过程</h3>
        <div class="space-y-6">
          <div v-for="(it, index) in trainingSteps" :key="it" class="flex items-start">
            <div
              class="flex-shrink-0 w-9 h-9 bg-accent/80 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4 shadow"
            >
              {{ index + 1 }}
            </div>
            <p class="text-slate-700 leading-relaxed pt-1">
              {{ it }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
