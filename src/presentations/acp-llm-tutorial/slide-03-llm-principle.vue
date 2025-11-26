<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const title = '大模型基本原理'
const principle = [
  'Transformer 架构是核心，基于自注意力机制（Self-Attention）',
  '天生擅长处理序列数据，例如自然语言',
  '通过海量文本数据进行预训练（Pre-training），学习语言的统计规律',
  '通过微调（Fine-tuning）适应特定任务，例如翻译、摘要、对话等',
  '模型规模（参数数量）越大，能力越强，涌现出更复杂的推理能力',
  '本质上是一个“概率计算器”，预测下一个词的概率分布',
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

    <div class="mt-8 max-w-5xl mx-auto">
      <div
        class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6"
      >
        <ul class="flex flex-wrap gap-2">
          <li
            v-for="it in principle"
            :key="it"
            class="px-3 py-1.5 rounded-full text-sm bg-slate-100 border border-slate-200/60 text-slate-700"
          >
            {{ it }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
