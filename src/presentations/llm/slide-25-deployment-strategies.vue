<script setup lang="ts">
import { ref } from 'vue'

const strategies = [
  {
    title: '模型量化 (Quantization)',
    icon: '📉',
    desc: '降低精度以减少显存占用并提高速度',
    details: [
      'FP16 (16-bit) -> INT8 / INT4',
      '常用算法: GPTQ, AWQ, GGUF',
      '效果: 显存减少 50-75%，推理速度显著提升，精度损失微小',
    ],
    color: 'bg-blue-50 border-blue-200 text-blue-800',
  },
  {
    title: '推理加速 (Inference)',
    icon: '🚀',
    desc: '通过优化显存管理和批处理提升吞吐量',
    details: [
      'PagedAttention (vLLM): 解决显存碎片化',
      'Continuous Batching: 动态插入新请求',
      'FlashAttention: 硬件感知的注意力机制优化',
    ],
    color: 'bg-purple-50 border-purple-200 text-purple-800',
  },
  {
    title: '部署框架 (Frameworks)',
    icon: '🏗️',
    desc: '成熟的生产级服务框架',
    details: [
      'vLLM: 高吞吐，易用，社区活跃',
      'TensorRT-LLM: NVIDIA 极致优化',
      'Ollama: 本地开发与边缘部署首选',
      'TGI: Hugging Face 官方方案',
    ],
    color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  },
]

const selectedStrategy = ref(strategies[0])
</script>

<template>
  <section class="container mx-auto max-w-7xl px-6 py-12 h-full flex flex-col">
    <div class="mb-8 text-center flex-shrink-0">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
      >
        LLM 部署与推理优化
      </h2>
      <p class="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
        从实验室到生产环境：如何实现“快、省、稳”的模型服务
      </p>
    </div>

    <div class="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
      <!-- Left: Strategy List -->
      <div class="lg:col-span-5 flex flex-col gap-4 overflow-y-auto pr-2">
        <button
          v-for="strategy in strategies"
          :key="strategy.title"
          @click="selectedStrategy = strategy"
          class="text-left p-6 rounded-2xl border-2 transition-all duration-200 hover:shadow-lg group relative overflow-hidden"
          :class="
            selectedStrategy.title === strategy.title
              ? strategy.color + ' border-current shadow-md'
              : 'bg-white border-slate-100 hover:border-slate-300'
          "
        >
          <div class="flex items-start justify-between relative z-10">
            <div class="flex items-center gap-4">
              <span
                class="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                >{{ strategy.icon }}</span
              >
              <div>
                <h3
                  class="font-bold text-lg"
                  :class="
                    selectedStrategy.title === strategy.title ? 'text-current' : 'text-slate-800'
                  "
                >
                  {{ strategy.title }}
                </h3>
                <p
                  class="text-sm opacity-90 mt-1"
                  :class="
                    selectedStrategy.title === strategy.title ? 'text-current' : 'text-slate-500'
                  "
                >
                  {{ strategy.desc }}
                </p>
              </div>
            </div>
          </div>
        </button>
      </div>

      <!-- Right: Detail Visualization -->
      <div
        class="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xl p-8 flex flex-col relative overflow-hidden"
      >
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-slate-50 to-slate-100 rounded-bl-full -z-0 opacity-50"
        ></div>

        <transition name="fade" mode="out-in">
          <div :key="selectedStrategy.title" class="relative z-10 h-full flex flex-col">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span class="text-3xl">{{ selectedStrategy.icon }}</span>
              <h3 class="text-2xl font-bold text-slate-800">{{ selectedStrategy.title }}</h3>
            </div>

            <div class="flex-grow space-y-6">
              <div
                v-for="(detail, index) in selectedStrategy.details"
                :key="index"
                class="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 transform transition-all duration-500"
                :style="{ transitionDelay: `${index * 100}ms` }"
              >
                <div
                  class="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-500 shadow-sm flex-shrink-0"
                >
                  {{ index + 1 }}
                </div>
                <p class="text-lg text-slate-700 font-medium pt-0.5">{{ detail }}</p>
              </div>

              <!-- Visual Representations based on selection -->
              <div
                class="mt-8 p-6 bg-slate-900 rounded-xl text-slate-300 font-mono text-sm shadow-inner overflow-hidden relative"
              >
                <div class="absolute top-2 right-2 flex gap-1.5">
                  <div class="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>

                <div v-if="selectedStrategy.title.includes('量化')">
                  <p class="text-green-400"># 显存占用对比 (Llama-3-70B)</p>
                  <div class="mt-4 space-y-3">
                    <div>
                      <div class="flex justify-between mb-1">
                        <span>FP16 (140GB)</span>
                        <span class="text-red-400">需 2x A100 (80G)</span>
                      </div>
                      <div class="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div class="h-full bg-red-500 w-[90%]"></div>
                      </div>
                    </div>
                    <div>
                      <div class="flex justify-between mb-1">
                        <span>INT4 (40GB)</span>
                        <span class="text-green-400">仅 1x A6000 (48G)</span>
                      </div>
                      <div class="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div class="h-full bg-green-500 w-[30%]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else-if="selectedStrategy.title.includes('推理')">
                  <p class="text-purple-400"># vLLM PagedAttention 示意</p>
                  <div class="mt-4 flex gap-2 overflow-x-auto pb-2">
                    <div class="border border-slate-600 p-2 rounded w-24 flex-shrink-0 text-center">
                      <div class="text-[10px] text-slate-500">Block 1</div>
                      <div class="bg-blue-900/50 mt-1 h-8 rounded flex items-center justify-center">
                        KV Cache
                      </div>
                    </div>
                    <div
                      class="border border-slate-600 border-dashed p-2 rounded w-24 flex-shrink-0 text-center opacity-50"
                    >
                      <div class="text-[10px] text-slate-500">Gap</div>
                    </div>
                    <div class="border border-slate-600 p-2 rounded w-24 flex-shrink-0 text-center">
                      <div class="text-[10px] text-slate-500">Block 2</div>
                      <div class="bg-blue-900/50 mt-1 h-8 rounded flex items-center justify-center">
                        KV Cache
                      </div>
                    </div>
                    <div class="flex items-center text-xs text-slate-400">
                      -> 物理非连续，逻辑连续
                    </div>
                  </div>
                </div>

                <div v-else>
                  <p class="text-emerald-400">$ vllm serve meta-llama/Llama-3-8b-instruct</p>
                  <p class="mt-2 text-slate-400">INFO: Started server process [12345]</p>
                  <p class="text-slate-400">INFO: Application startup complete.</p>
                  <p class="mt-2 text-yellow-300">Available at http://localhost:8000/v1</p>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
