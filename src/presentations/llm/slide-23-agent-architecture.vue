<script setup lang="ts">
import { ref } from 'vue'

const activeFeature = ref('brain')

const features = [
  {
    id: 'brain',
    icon: '🧠',
    title: 'Brain (LLM)',
    description: '核心控制器',
    details: [
      '负责所有的推理、规划和决策制定。',
      '就像人类的大脑，处理输入信息，调用记忆，决定下一步行动。',
      'Prompt Engineering 在这里起着关键作用，定义了 Agent 的角色和行为准则。',
    ],
  },
  {
    id: 'planning',
    icon: '📝',
    title: 'Planning (规划)',
    description: '任务拆解与反思',
    details: [
      '子目标分解：将大目标拆解为可管理的小步骤 (Chain of Thought, Tree of Thoughts)。',
      '反思与修正：自我批评 (Self-Reflection)，从过去的错误中学习并优化未来的行动。',
      '就像项目经理在执行前先列出 To-Do List。',
    ],
  },
  {
    id: 'memory',
    icon: '💾',
    title: 'Memory (记忆)',
    description: '上下文与知识库',
    details: [
      '短期记忆：所有的上下文窗口内容，记录当前的对话历史。',
      '长期记忆：通常使用向量数据库 (Vector DB)，存储和检索大量的外部知识。',
      '就像人类既有工作记忆，也有长期知识储备。',
    ],
  },
  {
    id: 'tools',
    icon: '🛠️',
    title: 'Tools (工具使用)',
    description: '执行行动的能力',
    details: [
      '扩展 LLM 的能力边界，使其不仅仅是文本生成器。',
      '常见工具：计算器、代码解释器、搜索引擎、API 接口、文件系统操作。',
      '通过 Function Calling 或 MCP 协议连接外部世界。',
    ],
  },
  {
    id: 'react',
    icon: '🔄',
    title: 'ReAct Framework',
    description: 'Reasoning + Acting',
    details: [
      '核心思想：将“推理 (Reasoning)”和“行动 (Acting)”交织，形成闭环。',
      '三步循环：Thought (思考下一步) → Action (调用工具) → Observation (观察结果)。',
      '优势：相比于直接生成答案，ReAct 能处理更复杂的任务，并在遇到错误时自我修正。',
    ],
  },
]
</script>

<template>
  <section class="container mx-auto max-w-7xl px-6 py-12 h-full flex flex-col">
    <div class="mb-8 text-center flex-shrink-0">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
      >
        AI Agent 智能体架构
      </h2>
      <p class="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
        Agent = LLM (大脑) + Planning (规划) + Memory (记忆) + Tools (工具)
      </p>
    </div>

    <div class="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-0">
      <!-- Left: Interactive Architecture Diagram -->
      <div
        class="relative h-full min-h-[400px] bg-white/50 rounded-3xl border border-slate-200 shadow-xl backdrop-blur-sm p-8 flex flex-col justify-center items-center select-none overflow-hidden group"
      >
        <!-- Background Grid -->
        <div
          class="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"
        ></div>

        <!-- Central Brain -->
        <div
          @click="activeFeature = 'brain'"
          class="relative z-20 w-40 h-40 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl cursor-pointer transition-all duration-300 hover:scale-110 ring-4 ring-offset-4"
          :class="activeFeature === 'brain' ? 'ring-indigo-300 scale-110' : 'ring-transparent'"
        >
          <div class="text-6xl animate-pulse">🧠</div>
          <span class="absolute -bottom-8 font-bold text-slate-700">Brain (LLM)</span>
        </div>

        <!-- Orbiting Nodes -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <!-- Planning Node (Top) -->
          <div
            class="absolute -translate-y-40 pointer-events-auto"
            @click="activeFeature = 'planning'"
          >
            <div
              class="w-24 h-24 rounded-2xl bg-white border-2 border-blue-200 shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:border-blue-400 hover:shadow-blue-200/50"
              :class="
                activeFeature === 'planning' ? 'border-blue-500 shadow-blue-300/50 scale-110' : ''
              "
            >
              <span class="text-4xl">📝</span>
            </div>
            <span class="absolute w-full text-center top-full mt-2 font-semibold text-slate-600"
              >Planning</span
            >
            <!-- Connection Line -->
            <div class="absolute top-full left-1/2 w-0.5 h-16 bg-slate-300 -z-10 origin-top"></div>
          </div>

          <!-- Memory Node (Right) -->
          <div
            class="absolute translate-x-40 pointer-events-auto"
            @click="activeFeature = 'memory'"
          >
            <div
              class="w-24 h-24 rounded-2xl bg-white border-2 border-emerald-200 shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:border-emerald-400 hover:shadow-emerald-200/50"
              :class="
                activeFeature === 'memory'
                  ? 'border-emerald-500 shadow-emerald-300/50 scale-110'
                  : ''
              "
            >
              <span class="text-4xl">💾</span>
            </div>
            <span class="absolute w-full text-center top-full mt-2 font-semibold text-slate-600"
              >Memory</span
            >
            <!-- Connection Line -->
            <div class="absolute right-full top-1/2 h-0.5 w-16 bg-slate-300 -z-10"></div>
          </div>

          <!-- Tools Node (Bottom) -->
          <div class="absolute translate-y-40 pointer-events-auto" @click="activeFeature = 'tools'">
            <div
              class="w-24 h-24 rounded-2xl bg-white border-2 border-amber-200 shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:border-amber-400 hover:shadow-amber-200/50"
              :class="
                activeFeature === 'tools' ? 'border-amber-500 shadow-amber-300/50 scale-110' : ''
              "
            >
              <span class="text-4xl">🛠️</span>
            </div>
            <span class="absolute w-full text-center top-full mt-2 font-semibold text-slate-600"
              >Action</span
            >
            <!-- Connection Line -->
            <div class="absolute bottom-full left-1/2 w-0.5 h-16 bg-slate-300 -z-10"></div>
          </div>

          <!-- ReAct Node (Bottom Left) -->
          <div
            class="absolute -translate-x-28 translate-y-28 pointer-events-auto"
            @click="activeFeature = 'react'"
          >
            <div
              class="w-20 h-20 rounded-2xl bg-white border-2 border-rose-200 shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:border-rose-400 hover:shadow-rose-200/50"
              :class="
                activeFeature === 'react' ? 'border-rose-500 shadow-rose-300/50 scale-110' : ''
              "
            >
              <span class="text-3xl">🔄</span>
            </div>
            <span class="absolute w-full text-center top-full mt-2 font-semibold text-slate-600"
              >ReAct</span
            >
            <!-- Connection Hint -->
            <div
              class="absolute -top-2 -right-2 w-16 h-0.5 bg-slate-300 -z-10 origin-left -rotate-45"
            ></div>
          </div>

          <!-- Perception Node (Left - Input) -->
          <div class="absolute -translate-x-40 flex flex-col items-center">
            <div
              class="px-4 py-2 bg-slate-800 text-white rounded-lg shadow-lg mb-2 text-sm font-medium"
            >
              Sensors / User
            </div>
            <div class="w-16 h-0.5 bg-slate-400 relative">
              <div
                class="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-slate-400 rotate-45"
              ></div>
            </div>
            <span class="text-xs text-slate-500 mt-1">Perception</span>
          </div>
        </div>
      </div>

      <!-- Right: Detail Panel -->
      <div class="h-full flex flex-col justify-center">
        <transition mode="out-in" name="fade-slide">
          <div
            v-if="activeFeature"
            :key="activeFeature"
            class="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200 shadow-2xl"
          >
            <div class="flex items-center gap-4 mb-6">
              <span class="text-5xl">{{ features.find((f) => f.id === activeFeature)?.icon }}</span>
              <div>
                <h3 class="text-3xl font-bold text-slate-800">
                  {{ features.find((f) => f.id === activeFeature)?.title }}
                </h3>
                <p class="text-lg text-slate-500 font-medium">
                  {{ features.find((f) => f.id === activeFeature)?.description }}
                </p>
              </div>
            </div>

            <ul class="space-y-4">
              <li
                v-for="(point, idx) in features.find((f) => f.id === activeFeature)?.details"
                :key="idx"
                class="flex items-start gap-3 text-lg text-slate-700 leading-relaxed"
              >
                <span class="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0"></span>
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.bg-grid-slate-100 {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(241 245 249)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
}
</style>
