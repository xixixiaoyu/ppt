<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 模拟实时监控数据
const latency = ref(120)
const rpm = ref(450)
const errorRate = ref(0.2)

// 简单的动画效果
onMounted(() => {
  setInterval(() => {
    latency.value = 100 + Math.random() * 40
    rpm.value = 400 + Math.floor(Math.random() * 100)
    errorRate.value = Math.random() * 0.5
  }, 2000)
})

const practices = [
  {
    category: 'Safety & Security',
    icon: '🛡️',
    items: [
      'Prompt Injection 防护 (Rebuff, NeMo Guardrails)',
      'PII 敏感信息过滤 (Presidio)',
      '输出合规性检查 (敏感词、毒性检测)'
    ]
  },
  {
    category: 'Observability',
    icon: '📊',
    items: [
      'Tracing: LangSmith, LangFuse (全链路追踪)',
      'Metrics: Token 消耗, 首字延迟 (TTFT), 总延迟',
      'Feedback: 用户点赞/点踩收集与分析'
    ]
  },
  {
    category: 'LLMOps Workflow',
    icon: '⚙️',
    items: [
      'Dataset Management: 评估集版本控制',
      'Regression Testing: 每次 Prompt 变更后的自动评估',
      'A/B Testing: 线上流量分发对比模型效果'
    ]
  }
]
</script>

<template>
  <section class="container mx-auto max-w-7xl px-6 py-12 h-full flex flex-col">
    <div class="mb-6 text-center flex-shrink-0">
      <h2 class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
        生产环境应用最佳实践 (LLMOps)
      </h2>
      <p class="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
        构建可信、可靠、可观测的企业级大模型应用
      </p>
    </div>

    <div class="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-0">
      
      <!-- Left Column: Best Practices List -->
      <div class="flex flex-col gap-6 justify-center">
        <div 
          v-for="(practice, idx) in practices" 
          :key="practice.category"
          class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div class="flex items-center gap-3 mb-4">
            <span class="text-3xl bg-slate-50 p-2 rounded-lg">{{ practice.icon }}</span>
            <h3 class="text-xl font-bold text-slate-800">{{ practice.category }}</h3>
          </div>
          <ul class="space-y-3">
            <li v-for="item in practice.items" :key="item" class="flex items-start gap-3 text-slate-600">
              <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Right Column: Monitoring Dashboard Simulation -->
      <div class="bg-slate-900 rounded-3xl p-6 md:p-8 text-slate-200 shadow-2xl flex flex-col gap-6 font-mono relative overflow-hidden">
        <!-- Background decorative elements -->
        <div class="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>
        <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>

        <div class="flex items-center justify-between border-b border-slate-700 pb-4">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <span class="font-bold text-lg text-white">Live Monitor</span>
          </div>
          <span class="text-xs text-slate-500">env: production-us-east-1</span>
        </div>

        <!-- Metrics Grid -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <div class="text-xs text-slate-400 mb-1">Avg Latency (P99)</div>
            <div class="text-2xl font-bold text-blue-400 flex items-end gap-2">
              {{ latency.toFixed(0) }} <span class="text-sm text-slate-500 mb-1">ms</span>
            </div>
            <!-- Simple sparkline simulation -->
            <div class="flex gap-0.5 items-end h-8 mt-2 opacity-50">
               <div v-for="n in 10" :key="n" class="w-full bg-blue-500 rounded-t-sm" :style="{ height: Math.random() * 100 + '%' }"></div>
            </div>
          </div>

          <div class="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
             <div class="text-xs text-slate-400 mb-1">Throughput</div>
             <div class="text-2xl font-bold text-emerald-400 flex items-end gap-2">
              {{ rpm }} <span class="text-sm text-slate-500 mb-1">RPM</span>
            </div>
             <div class="flex gap-0.5 items-end h-8 mt-2 opacity-50">
               <div v-for="n in 10" :key="n" class="w-full bg-emerald-500 rounded-t-sm" :style="{ height: Math.random() * 100 + '%' }"></div>
            </div>
          </div>
        </div>

        <!-- Log Stream Simulation -->
        <div class="flex-grow bg-black/30 rounded-xl p-4 overflow-hidden text-xs space-y-2 border border-slate-700/30">
          <div class="flex gap-2 text-green-400/80">
            <span class="text-slate-500">[10:42:01]</span>
            <span>INFO: Request processed successfully (id=req_8a9v)</span>
          </div>
           <div class="flex gap-2 text-green-400/80">
            <span class="text-slate-500">[10:42:02]</span>
            <span>INFO: Cache hit for prompt_hash_x92 (latency=12ms)</span>
          </div>
           <div class="flex gap-2 text-yellow-400/80">
            <span class="text-slate-500">[10:42:03]</span>
            <span>WARN: Token limit approaching for user_id=9921</span>
          </div>
           <div class="flex gap-2 text-red-400/80" v-if="errorRate > 0.4">
            <span class="text-slate-500">[10:42:04]</span>
            <span>ERR: Guardrail blocked input: PII detected (confidence=0.98)</span>
          </div>
          <div class="flex gap-2 text-blue-400/80 animate-pulse">
            <span class="text-slate-500">[10:42:05]</span>
            <span>DEBUG: Auto-scaling triggered: +2 replicas</span>
          </div>
        </div>

        <div class="flex items-center gap-4 text-xs text-slate-400 bg-slate-800/30 p-3 rounded-lg">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
            <span>API: Healthy</span>
          </div>
           <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
            <span>DB: Healthy</span>
          </div>
           <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span>Vector Store: High Load</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
