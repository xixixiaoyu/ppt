<script setup lang="ts">
const challenges = [
  {
    title: '幻觉 (Hallucinations)',
    desc: '一本正经地胡说八道，编造事实。',
    severity: 'High'
  },
  {
    title: '非确定性 (Non-determinism)',
    desc: '相同的输入，每次输出可能不同，难以测试。',
    severity: 'Medium'
  },
  {
    title: '指令遵循失效 (Instruction Following)',
    desc: '忽略复杂的指令约束或格式要求。',
    severity: 'Medium'
  }
]

const strategies = [
  {
    name: 'Defensive Prompting',
    desc: '防御性提示词',
    details: '明确告诉模型"不知道就说不知道"，分步骤思考 (CoT)，要求引用来源。',
    icon: '🛡️'
  },
  {
    name: 'Guardrails & Validation',
    desc: '护栏与校验',
    details: '使用正则、代码解析器或专门的 Guardrail 模型 (如 NeMo) 拦截不合规输出。',
    icon: '🚧'
  },
  {
    name: 'Fallback Mechanisms',
    desc: '降级机制',
    details: '当 LLM 调用失败或输出质量低时，切换到规则引擎或人工客服。',
    icon: '🪂'
  },
  {
    name: 'Human-in-the-Loop',
    desc: '人在回路',
    details: '对于高风险操作，必须经过人工审核确认后方可执行。',
    icon: '👩‍💻'
  }
]
</script>

<template>
  <section class="container mx-auto max-w-7xl px-6 py-12 h-full flex flex-col">
    <div class="mb-8 text-center flex-shrink-0">
      <h2 class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">
        不可靠工程化治理
      </h2>
      <p class="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
        Embracing Uncertainty: 在概率性模型之上构建确定性系统
      </p>
    </div>

    <div class="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
      
      <!-- Left Column: The Risks (3 cols) -->
      <div class="lg:col-span-4 flex flex-col gap-4">
        <div class="bg-red-50 rounded-2xl p-6 border border-red-100 h-full">
          <h3 class="text-2xl font-bold text-red-900 mb-6 flex items-center gap-2">
            <span>⚠️</span> 核心挑战
          </h3>
          <div class="flex flex-col gap-4">
            <div 
              v-for="item in challenges" 
              :key="item.title"
              class="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-400"
            >
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-bold text-slate-800">{{ item.title }}</h4>
                <span class="text-[10px] px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-bold uppercase">{{ item.severity }}</span>
              </div>
              <p class="text-sm text-slate-600">{{ item.desc }}</p>
            </div>
          </div>
          <div class="mt-6 p-4 bg-red-100/50 rounded-xl text-sm text-red-800 italic">
            "LLM 不是数据库，也不是逻辑引擎，它只是一个概率预测器。"
          </div>
        </div>
      </div>

      <!-- Center: Arrow (Hidden on mobile) -->
      <div class="hidden lg:flex lg:col-span-1 items-center justify-center text-slate-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </div>

      <!-- Right Column: The Solutions (7 cols) -->
      <div class="lg:col-span-7">
        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm h-full flex flex-col">
          <h3 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span>🛠️</span> 治理策略
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow content-start">
            <div 
              v-for="strat in strategies" 
              :key="strat.name"
              class="bg-slate-50 hover:bg-slate-100 transition-colors p-5 rounded-xl border border-slate-100 group"
            >
              <div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 origin-left">{{ strat.icon }}</div>
              <h4 class="font-bold text-slate-800 mb-1">{{ strat.name }}</h4>
              <p class="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">{{ strat.desc }}</p>
              <p class="text-sm text-slate-600 leading-relaxed">{{ strat.details }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
