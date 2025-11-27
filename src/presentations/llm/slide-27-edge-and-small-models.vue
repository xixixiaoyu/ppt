<script setup lang="ts">
const advantages = [
  {
    title: '隐私安全 (Privacy)',
    desc: '数据无需上传云端，本地处理，从根本上解决隐私泄露风险。',
    icon: '🔒',
  },
  {
    title: '低延迟 (Latency)',
    desc: '消除网络传输耗时，实现即时响应，提升用户交互体验。',
    icon: '⚡',
  },
  {
    title: '低成本 (Cost)',
    desc: '利用终端算力，大幅降低云端推理成本，无需按 Token 付费。',
    icon: '💰',
  },
  {
    title: '离线可用 (Offline)',
    desc: '无网络环境下依然可用，适合车载、移动设备等不稳定网络场景。',
    icon: '✈️',
  },
]

const models = [
  { name: 'Llama 3 8B', org: 'Meta', params: '8B', feat: '开源标杆，性能强劲' },
  { name: 'Phi-3 Mini', org: 'Microsoft', params: '3.8B', feat: '以小博大，手机端可跑' },
  { name: 'Gemma 2 9B', org: 'Google', params: '9B', feat: '同源 Gemini，高效架构' },
  { name: 'Qwen2-7B', org: 'Alibaba', params: '7B', feat: '多语言能力出色，中文优' },
  { name: 'Mistral 7B', org: 'Mistral AI', params: '7B', feat: '高性能，社区生态丰富' },
]
</script>

<template>
  <section class="container mx-auto max-w-7xl px-6 py-12 h-full flex flex-col">
    <div class="mb-8 text-center flex-shrink-0">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600"
      >
        端侧模型与开源小模型
      </h2>
      <p class="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
        AI Everywhere: 从云端巨无霸走向终端小而美
      </p>
    </div>

    <div class="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-10 min-h-0">
      <!-- Left Column: Why Small Models? -->
      <div class="flex flex-col gap-6 justify-center">
        <div class="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100">
          <h3 class="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <span>📱</span> 为什么趋势向"小"？
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="adv in advantages"
              :key="adv.title"
              class="bg-white p-4 rounded-xl shadow-sm border border-slate-100"
            >
              <div class="text-3xl mb-2">{{ adv.icon }}</div>
              <h4 class="font-bold text-slate-800 mb-1">{{ adv.title }}</h4>
              <p class="text-sm text-slate-600 leading-snug">{{ adv.desc }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 class="text-lg font-bold text-slate-800 mb-3">关键技术驱动</h3>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
              >Model Distillation (蒸馏)</span
            >
            <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
              >Quantization (量化 4-bit/8-bit)</span
            >
            <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
              >Pruning (剪枝)</span
            >
            <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
              >MoE (混合专家)</span
            >
          </div>
        </div>
      </div>

      <!-- Right Column: Representative Models -->
      <div
        class="bg-slate-900 rounded-3xl p-8 text-slate-200 shadow-2xl flex flex-col relative overflow-hidden"
      >
        <!-- Decoration -->
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -mr-16 -mt-16"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -ml-16 -mb-16"
        ></div>

        <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
          <span class="text-purple-400">🚀</span>
          开源小模型名人堂
        </h3>

        <div class="flex flex-col gap-4 relative z-10 overflow-y-auto pr-2 custom-scrollbar">
          <div
            v-for="(model, idx) in models"
            :key="model.name"
            class="group bg-slate-800/50 hover:bg-slate-800 transition-colors p-4 rounded-xl border border-slate-700 flex items-center justify-between"
          >
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="font-bold text-lg text-white">{{ model.name }}</span>
                <span class="text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-300">{{
                  model.org
                }}</span>
              </div>
              <div class="text-sm text-slate-400">{{ model.feat }}</div>
            </div>
            <div class="flex flex-col items-end">
              <span class="text-xl font-mono font-bold text-purple-400">{{ model.params }}</span>
              <span class="text-[10px] text-slate-500 uppercase">Params</span>
            </div>
          </div>
        </div>

        <div class="mt-auto pt-6 border-t border-slate-700/50 relative z-10">
          <p class="text-sm text-slate-400 italic">
            "The future of AI is hybrid: Cloud for heavy lifting, Edge for privacy and speed."
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}
</style>
