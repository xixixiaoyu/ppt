<script setup lang="ts">
import { BeakerIcon, ExclamationTriangleIcon, LockOpenIcon } from '@heroicons/vue/24/outline'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const problem = {
  title: '传统安全边界的失效',
  description:
    '大模型的自然语言接口使其极易受到“社交工程”式的攻击。传统的防火墙和规则引擎难以应对语义层面的挑战。',
  points: [
    '输入开放性：用户可以输入任何内容，增加了攻击面。',
    '输出不确定性：模型的生成内容难以预测，可能产生有害信息。',
    '语义复杂性：攻击者可以利用语言的微妙之处绕过简单规则。',
  ],
}

const threats = [
  {
    icon: BeakerIcon,
    title: '提示注入 (Prompt Injection)',
    description: '攻击者通过精心构造的输入，劫持模型原始意图，使其执行恶意指令或泄露敏感信息。',
  },
  {
    icon: ExclamationTriangleIcon,
    title: '不当内容生成',
    description: '在诱导下，模型可能生成涉黄、涉暴、涉政或包含仇恨言论的内容，带来合规风险。',
  },
  {
    icon: LockOpenIcon,
    title: '数据与隐私泄露',
    description: '模型可能在无意中泄露训练数据中的个人信息、商业机密等敏感内容。',
  },
]
</script>

<template>
  <div class="h-full w-full flex flex-col justify-center items-center p-8 bg-white">
    <div class="text-center mb-8 max-w-4xl">
      <h2
        class="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-fuchsia-500"
      >
        安全篇：大模型应用的安全风险
      </h2>
      <p class="text-lg text-slate-600 mt-3">
        当模型对外开放时，新的挑战浮出水面：如何防范恶意使用和内容风险？
      </p>
    </div>

    <div
      class="w-full max-w-5xl bg-white/60 backdrop-blur-sm ring-1 ring-slate-200/50 rounded-2xl shadow-lg p-8 mb-8"
    >
      <h3 class="text-2xl font-bold text-center text-slate-800 mb-4">{{ problem.title }}</h3>
      <p class="text-center text-slate-600 mb-6 max-w-3xl mx-auto">{{ problem.description }}</p>
      <ul class="flex justify-center gap-4 text-center flex-wrap">
        <li
          v-for="point in problem.points"
          :key="point"
          class="bg-rose-100/80 ring-1 ring-rose-200/50 rounded-full px-4 py-1.5 text-sm"
        >
          <span class="font-semibold text-rose-700">{{ point.split('：')[0] }}</span>
          <span class="text-slate-700/90">：{{ point.split('：')[1] }}</span>
        </li>
      </ul>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
      <div
        v-for="threat in threats"
        :key="threat.title"
        class="flex flex-col bg-white/60 backdrop-blur-sm ring-1 ring-slate-200/50 rounded-2xl shadow-lg p-6 text-center items-center"
      >
        <div class="flex justify-center mb-4">
          <component :is="threat.icon" class="h-10 w-10 text-rose-500" />
        </div>
        <h3 class="text-xl font-bold text-slate-800">{{ threat.title }}</h3>
        <p class="text-slate-600 mt-2 flex-grow text-sm">{{ threat.description }}</p>
      </div>
    </div>
  </div>
</template>
