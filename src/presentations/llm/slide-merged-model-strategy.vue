<script setup lang="ts">
import Card from '@/shared/ui/Card.vue'
import HeadingGradient from '@/shared/ui/HeadingGradient.vue'
import Section from '@/shared/ui/Section.vue'
import {
  ChartBarIcon,
  CloudIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  RocketLaunchIcon,
  ScaleIcon,
  ServerStackIcon,
} from '@heroicons/vue/24/outline'
import { ref } from 'vue'

// Tabs configuration
const tabs = [
  { id: 'selection', name: '选型与经济学', icon: ScaleIcon },
  { id: 'deployment', name: '部署与加速', icon: RocketLaunchIcon },
  { id: 'edge', name: '端侧与小模型', icon: DevicePhoneMobileIcon },
]
const activeTab = ref('selection')

// --- 部署策略数据 ---
const deploymentStrategies = [
  {
    title: '模型量化',
    icon: '📉',
    desc: '降低精度，减少显存占用',
    details: [
      'FP16 → INT8/INT4',
      '算法: GPTQ, AWQ, GGUF',
      '效果: 显存减 50-75%，速度提升',
    ],
    color: 'bg-blue-50 border-blue-200 text-blue-800',
  },
  {
    title: '推理加速',
    icon: '🚀',
    desc: '优化显存管理和批处理',
    details: [
      'PagedAttention: 解决显存碎片',
      'Continuous Batching: 动态插入请求',
      'FlashAttention: 硬件感知优化',
    ],
    color: 'bg-purple-50 border-purple-200 text-purple-800',
  },
  {
    title: '部署框架',
    icon: '🏗️',
    desc: '生产级服务框架',
    details: [
      'vLLM: 高吞吐，易用',
      'TensorRT-LLM: NVIDIA 极致优化',
      'Ollama: 本地开发首选',
      'TGI: Hugging Face 官方方案',
    ],
    color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  },
]
const selectedDeploymentStrategy = ref(deploymentStrategies[0])

// --- 端侧优势 ---
const edgeAdvantages = [
  {
    title: '隐私安全',
    desc: '数据本地处理，无需上传云端',
    icon: '🔒',
  },
  {
    title: '低延迟',
    desc: '消除网络传输，即时响应',
    icon: '⚡',
  },
  {
    title: '低成本',
    desc: '利用终端算力，降低云端成本',
    icon: '💰',
  },
  {
    title: '离线可用',
    desc: '无网络环境可用，适合移动场景',
    icon: '✈️',
  },
]

// --- 小模型列表 ---
const edgeModels = [
  { name: 'Llama 3 8B', org: 'Meta', params: '8B', feat: '开源标杆' },
  { name: 'Phi-3 Mini', org: 'Microsoft', params: '3.8B', feat: '手机端可跑' },
  { name: 'Gemma 2 9B', org: 'Google', params: '9B', feat: '同源 Gemini' },
  { name: 'Qwen3-7B', org: 'Alibaba', params: '7B', feat: '中文优化' },
  { name: 'Mistral 7B', org: 'Mistral AI', params: '7B', feat: '高性能' },
]
</script>

<template>
  <Section>
    <Card
      padding="none"
      class="h-full flex flex-col bg-slate-50/50 overflow-hidden"
    >
      <!-- Header Area -->
      <div class="bg-white border-b border-slate-200 px-6 py-4 shrink-0">
        <div
          class="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <!-- Title -->
          <div>
            <HeadingGradient
              :level="2"
              size="3xl"
              palette="indigo-fuchsia-emerald"
              class="leading-tight font-bold tracking-tight"
            >
              LLM 落地策略
            </HeadingGradient>
            <p class="text-sm text-slate-500 font-medium mt-1">
              模型选型、部署优化到端侧落地
            </p>
          </div>

          <!-- Tabs Navigation -->
          <div class="flex bg-slate-100 p-1 rounded-xl self-start md:self-auto">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
              :class="
                activeTab === tab.id
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              "
            >
              <component :is="tab.icon" class="w-4 h-4" />
              {{ tab.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 overflow-hidden relative p-6">
        <Transition name="fade" mode="out-in">
          <!-- Tab 1: Selection & Economics -->
          <div
            v-if="activeTab === 'selection'"
            class="h-full flex flex-col gap-6 overflow-y-auto"
          >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              <!-- Left: Open vs Closed -->
              <div class="flex flex-col gap-4">
                <h3
                  class="text-lg font-bold text-slate-800 flex items-center gap-2"
                >
                  <ScaleIcon class="w-5 h-5 text-indigo-500" />
                  开源 vs 闭源
                </h3>

                <!-- Closed Source -->
                <div
                  class="bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
                >
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                      <CloudIcon class="w-5 h-5 text-sky-500" />
                      <span class="font-bold text-slate-800">商业闭源模型</span>
                    </div>
                    <span
                      class="text-xs font-mono bg-sky-50 text-sky-700 px-2 py-0.5 rounded"
                      >GPT-4, Claude</span
                    >
                  </div>
                  <ul class="text-sm text-slate-600 space-y-2 ml-1">
                    <li class="flex items-start gap-2">
                      <span class="text-green-500 text-xs mt-1">✅</span>
                      <span
                        ><strong>SOTA 性能:</strong> 最强推理与知识能力</span
                      >
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-green-500 text-xs mt-1">✅</span>
                      <span><strong>免运维:</strong> 无需管理 GPU</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-red-500 text-xs mt-1">❌</span>
                      <span><strong>数据隐私:</strong> 数据需发送至第三方</span>
                    </li>
                  </ul>
                </div>

                <!-- Open Source -->
                <div
                  class="bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
                >
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                      <ServerStackIcon class="w-5 h-5 text-orange-500" />
                      <span class="font-bold text-slate-800"
                        >开源私有化模型</span
                      >
                    </div>
                    <span
                      class="text-xs font-mono bg-orange-50 text-orange-700 px-2 py-0.5 rounded"
                      >Llama, Qwen</span
                    >
                  </div>
                  <ul class="text-sm text-slate-600 space-y-2 ml-1">
                    <li class="flex items-start gap-2">
                      <span class="text-green-500 text-xs mt-1">✅</span>
                      <span
                        ><strong>绝对隐私:</strong>
                        数据不出内网，适合金融/医疗</span
                      >
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-green-500 text-xs mt-1">✅</span>
                      <span><strong>可定制:</strong> 允许全量微调</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-red-500 text-xs mt-1">❌</span>
                      <span
                        ><strong>运维复杂:</strong> 需 GPU 集群与专业运维</span
                      >
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Right: Economics -->
              <div class="flex flex-col gap-4">
                <h3
                  class="text-lg font-bold text-slate-800 flex items-center gap-2"
                >
                  <ChartBarIcon class="w-5 h-5 text-emerald-500" />
                  成本优化与权衡
                </h3>

                <!-- The Triangle -->
                <div
                  class="bg-white rounded-xl p-4 border border-slate-200 flex-1 flex flex-col items-center justify-center relative overflow-hidden min-h-[200px]"
                >
                  <div class="relative w-48 h-40 scale-90">
                    <div
                      class="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center"
                    >
                      <span
                        class="font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded text-xs"
                        >性能</span
                      >
                      <div
                        class="w-2 h-2 bg-indigo-400 rounded-full mt-1"
                      ></div>
                    </div>
                    <div
                      class="absolute bottom-0 left-0 flex flex-col items-center"
                    >
                      <div
                        class="w-2 h-2 bg-emerald-400 rounded-full mb-1"
                      ></div>
                      <span
                        class="font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded text-xs"
                        >成本</span
                      >
                    </div>
                    <div
                      class="absolute bottom-0 right-0 flex flex-col items-center"
                    >
                      <div class="w-2 h-2 bg-rose-400 rounded-full mb-1"></div>
                      <span
                        class="font-bold text-rose-700 bg-rose-50 px-2 py-1 rounded text-xs"
                        >隐私</span
                      >
                    </div>
                    <svg
                      class="absolute inset-0 w-full h-full pointer-events-none"
                      style="z-index: -1"
                    >
                      <polygon
                        points="96,25 20,135 172,135"
                        fill="none"
                        stroke="#cbd5e1"
                        stroke-width="2"
                      />
                    </svg>
                    <div
                      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-slate-400 text-center w-32"
                    >
                      通常只能<br />兼顾两项
                    </div>
                  </div>
                </div>

                <!-- Cost Saving Tips -->
                <div
                  class="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100"
                >
                  <h4
                    class="font-bold text-emerald-900 mb-2 flex items-center gap-2 text-sm"
                  >
                    <CurrencyDollarIcon class="w-4 h-4" />
                    成本优化策略
                  </h4>
                  <div class="grid grid-cols-2 gap-2 text-xs">
                    <div
                      class="bg-white p-2 rounded border border-emerald-100/50"
                    >
                      <strong class="text-slate-800 block"
                        >Prompt Caching</strong
                      >
                      <span class="text-slate-500"
                        >缓存公共前缀，降低延迟与成本</span
                      >
                    </div>
                    <div
                      class="bg-white p-2 rounded border border-emerald-100/50"
                    >
                      <strong class="text-slate-800 block"
                        >Model Routing</strong
                      >
                      <span class="text-slate-500"
                        >简单问题用小模型，复杂问题用大模型</span
                      >
                    </div>
                    <div
                      class="bg-white p-2 rounded border border-emerald-100/50"
                    >
                      <strong class="text-slate-800 block"
                        >Batch Inference</strong
                      >
                      <span class="text-slate-500"
                        >离线批量处理，可获 50% 折扣</span
                      >
                    </div>
                    <div
                      class="bg-white p-2 rounded border border-emerald-100/50"
                    >
                      <strong class="text-slate-800 block">Distillation</strong>
                      <span class="text-slate-500"
                        >用大模型生成数据微调小模型</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab 2: Deployment & Acceleration -->
          <div
            v-else-if="activeTab === 'deployment'"
            class="h-full flex flex-col gap-6 overflow-y-auto"
          >
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
              <!-- Left: Strategy List -->
              <div class="lg:col-span-5 flex flex-col gap-3">
                <button
                  v-for="strategy in deploymentStrategies"
                  :key="strategy.title"
                  @click="selectedDeploymentStrategy = strategy"
                  class="text-left p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md group relative overflow-hidden"
                  :class="
                    selectedDeploymentStrategy.title === strategy.title
                      ? strategy.color + ' border-current shadow-md'
                      : 'bg-white border-slate-100 hover:border-slate-300'
                  "
                >
                  <div class="flex items-center gap-3 relative z-10">
                    <span
                      class="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                      >{{ strategy.icon }}</span
                    >
                    <div>
                      <h3
                        class="font-bold text-base"
                        :class="
                          selectedDeploymentStrategy.title === strategy.title
                            ? 'text-current'
                            : 'text-slate-800'
                        "
                      >
                        {{ strategy.title }}
                      </h3>
                      <p
                        class="text-xs opacity-90 mt-0.5"
                        :class="
                          selectedDeploymentStrategy.title === strategy.title
                            ? 'text-current'
                            : 'text-slate-500'
                        "
                      >
                        {{ strategy.desc }}
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              <!-- Right: Detail Visualization -->
              <div
                class="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-lg p-6 flex flex-col relative overflow-hidden"
              >
                <div
                  class="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-slate-50 to-slate-100 rounded-bl-full -z-0 opacity-50"
                ></div>

                <transition name="fade" mode="out-in">
                  <div
                    :key="selectedDeploymentStrategy.title"
                    class="relative z-10 h-full flex flex-col"
                  >
                    <div
                      class="flex items-center gap-3 mb-4 pb-2 border-b border-slate-100"
                    >
                      <span class="text-2xl">{{
                        selectedDeploymentStrategy.icon
                      }}</span>
                      <h3 class="text-xl font-bold text-slate-800">
                        {{ selectedDeploymentStrategy.title }}
                      </h3>
                    </div>

                    <div class="flex-grow space-y-4">
                      <div
                        v-for="(
                          detail, index
                        ) in selectedDeploymentStrategy.details"
                        :key="index"
                        class="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100"
                      >
                        <div
                          class="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 shadow-sm flex-shrink-0"
                        >
                          {{ index + 1 }}
                        </div>
                        <p class="text-sm text-slate-700 font-medium pt-0.5">
                          {{ detail }}
                        </p>
                      </div>

                      <!-- Dynamic Visualizations -->
                      <div
                        class="mt-auto p-4 bg-slate-900 rounded-lg text-slate-300 font-mono text-xs shadow-inner overflow-hidden relative"
                      >
                        <div class="absolute top-2 right-2 flex gap-1">
                          <div class="w-2 h-2 rounded-full bg-red-500"></div>
                          <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <div class="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>

                        <div
                          v-if="
                            selectedDeploymentStrategy.title.includes('量化')
                          "
                        >
                          <p class="text-green-400 mb-2">
                            # 显存占用 (70B 模型)
                          </p>
                          <div class="space-y-2">
                            <div>
                              <div
                                class="flex justify-between mb-1 text-[10px]"
                              >
                                <span>FP16 (140GB)</span>
                                <span class="text-red-400">2x A100</span>
                              </div>
                              <div
                                class="h-1.5 bg-slate-700 rounded-full overflow-hidden"
                              >
                                <div class="h-full bg-red-500 w-[90%]"></div>
                              </div>
                            </div>
                            <div>
                              <div
                                class="flex justify-between mb-1 text-[10px]"
                              >
                                <span>INT4 (40GB)</span>
                                <span class="text-green-400">1x A6000</span>
                              </div>
                              <div
                                class="h-1.5 bg-slate-700 rounded-full overflow-hidden"
                              >
                                <div class="h-full bg-green-500 w-[30%]"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          v-else-if="
                            selectedDeploymentStrategy.title.includes('推理')
                          "
                        >
                          <p class="text-purple-400 mb-2"># vLLM 显存优化</p>
                          <div class="flex gap-2 overflow-x-auto pb-1">
                            <div
                              class="border border-slate-600 p-1 rounded w-16 flex-shrink-0 text-center"
                            >
                              <div class="text-[8px] text-slate-500">
                                Block 1
                              </div>
                              <div
                                class="bg-blue-900/50 mt-0.5 h-4 rounded"
                              ></div>
                            </div>
                            <div
                              class="border border-slate-600 border-dashed p-1 rounded w-8 flex-shrink-0 text-center opacity-50 flex items-center justify-center"
                            >
                              <span class="text-[8px]">...</span>
                            </div>
                            <div
                              class="border border-slate-600 p-1 rounded w-16 flex-shrink-0 text-center"
                            >
                              <div class="text-[8px] text-slate-500">
                                Block 2
                              </div>
                              <div
                                class="bg-blue-900/50 mt-0.5 h-4 rounded"
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div v-else>
                          <p class="text-emerald-400">
                            $ vllm serve llama-3-8b
                          </p>
                          <p class="mt-1 text-slate-400">
                            INFO: Started server...
                          </p>
                          <p class="mt-1 text-yellow-300">
                            Serving at http://localhost:8000
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>

          <!-- Tab 3: Edge & Small Models -->
          <div
            v-else-if="activeTab === 'edge'"
            class="h-full flex flex-col gap-6 overflow-y-auto"
          >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
              <!-- Left: Advantages -->
              <div class="flex flex-col gap-4 justify-center">
                <div
                  class="bg-indigo-50/50 rounded-xl p-5 border border-indigo-100"
                >
                  <h3
                    class="text-xl font-bold text-indigo-900 mb-3 flex items-center gap-2"
                  >
                    <span>📱</span> 小模型优势
                  </h3>
                  <div class="grid grid-cols-2 gap-3">
                    <div
                      v-for="adv in edgeAdvantages"
                      :key="adv.title"
                      class="bg-white p-3 rounded-lg shadow-sm border border-slate-100"
                    >
                      <div class="text-2xl mb-1">{{ adv.icon }}</div>
                      <h4 class="font-bold text-slate-800 text-sm mb-0.5">
                        {{ adv.title }}
                      </h4>
                      <p class="text-xs text-slate-600 leading-snug">
                        {{ adv.desc }}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  class="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"
                >
                  <h3 class="text-base font-bold text-slate-800 mb-2">
                    关键技术
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <span
                      class="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
                      >Model Distillation (蒸馏)</span
                    >
                    <span
                      class="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
                      >Quantization (量化)</span
                    >
                    <span
                      class="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
                      >Pruning (剪枝)</span
                    >
                    <span
                      class="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
                      >MoE (混合专家)</span
                    >
                  </div>
                </div>
              </div>

              <!-- Right: Hall of Fame -->
              <div
                class="bg-slate-900 rounded-2xl p-6 text-slate-200 shadow-xl flex flex-col relative overflow-hidden"
              >
                <div
                  class="absolute top-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl -mr-10 -mt-10"
                ></div>
                <div
                  class="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl -ml-10 -mb-10"
                ></div>

                <h3
                  class="text-xl font-bold text-white mb-4 flex items-center gap-2 relative z-10"
                >
                  <span class="text-purple-400">🚀</span>
                  主流小模型
                </h3>

                <div
                  class="flex flex-col gap-3 relative z-10 overflow-y-auto pr-1 custom-scrollbar flex-1"
                >
                  <div
                    v-for="model in edgeModels"
                    :key="model.name"
                    class="group bg-slate-800/50 hover:bg-slate-800 transition-colors p-3 rounded-lg border border-slate-700 flex items-center justify-between"
                  >
                    <div>
                      <div class="flex items-center gap-2 mb-0.5">
                        <span class="font-bold text-sm text-white">{{
                          model.name
                        }}</span>
                        <span
                          class="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300"
                          >{{ model.org }}</span
                        >
                      </div>
                      <div class="text-xs text-slate-400">{{ model.feat }}</div>
                    </div>
                    <div class="flex flex-col items-end">
                      <span
                        class="text-sm font-mono font-bold text-purple-400"
                        >{{ model.params }}</span
                      >
                      <span class="text-[8px] text-slate-500 uppercase"
                        >Params</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Card>
  </Section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}
</style>
