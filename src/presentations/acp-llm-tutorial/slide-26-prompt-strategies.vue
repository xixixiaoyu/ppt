<script setup lang="ts">
import {
  SparklesIcon,
  ListBulletIcon,
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  LinkIcon,
  ShieldExclamationIcon,
} from '@heroicons/vue/24/solid'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const strategies = [
  { title: '角色设定', description: '明确模型身份与职责，限定风格与语域' },
  { title: '上下文注入', description: '提供必要背景与术语表，减少歧义' },
  { title: '结构化输出', description: 'JSON/表格/要点，便于程序消费与校验' },
  { title: '少样本示例', description: '给出 1-3 个高质量示例对齐格式与口径' },
  { title: '分步推理', description: '先列步骤再得结论，暴露中间过程' },
  { title: '自我评审', description: '生成后自检错误与缺漏，给出修正建议' },
]

const templateIcs = `指令: 按规范回答用户问题
上下文: <提供的资料/限制条件>
步骤: 分解任务, 执行并记录
输出: JSON { answer, steps, citations }
失败处理: 给出原因与需要的额外信息`

const miniExample = `你是资深客服质检员
任务: 依据规范评审问答质量
上下文: 规范条目与会话记录
输出(JSON): { score: 0-100, issues: [], suggestions: [] }`

const goals = [
  { icon: LightBulbIcon, title: '对齐意图', description: '让模型准确理解任务与评价标准' },
  { icon: ShieldCheckIcon, title: '降低风险', description: '减少幻觉、越权和不当输出' },
  {
    icon: ClipboardDocumentCheckIcon,
    title: '增强可控',
    description: '稳定结构化输出, 便于程序消费',
  },
]

const principles = [
  '明确角色与任务边界',
  '提供必要上下文而非冗余信息',
  '约束输出格式与字段含义',
  '分步思考并暴露中间过程',
  '失败时给出原因与补救建议',
]

const skeleton = `角色: 你是资深领域专家
任务: 按规范回答用户问题
输入: 用户问题与相关上下文
约束: 只使用提供的上下文, 不编造
输出格式: JSON
{
  "answer": "...",
  "steps": ["...", "..."],
  "confidence": 0.0
}`

const ragRules = [
  {
    icon: DocumentTextIcon,
    title: '只用提供的上下文',
    description: '若不足以回答则说明不足, 不编造',
  },
  { icon: LinkIcon, title: '引用来源', description: '返回命中文档的标识与片段位置' },
  { icon: ShieldExclamationIcon, title: '输出受控', description: '结构化返回答案、依据与信心分数' },
]

const ragPrompt = `角色: 你是知识库问答助手
任务: 基于上下文准确回答问题
上下文: <检索到的文档片段>
约束: 只使用上下文, 不得引入外部知识
输出(JSON): {
  "answer": "...",
  "citations": [{ "doc_id": "...", "span": "start-end" }],
  "confidence": 0.0,
  "notice": "若上下文不足, 说明无法回答并指出缺失信息"
}`
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
      >
        提示词策略与模板
      </h2>
      <p class="mt-2 text-slate-600 max-w-3xl">以可复用的结构化模板提升一致性与可维护性。</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
      <div class="lg:col-span-2 space-y-6">
        <div
          class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6"
        >
          <h3 class="text-xl font-bold text-slate-900 mb-4">常用策略</h3>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li
              v-for="s in strategies"
              :key="s.title"
              class="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/60"
            >
              <SparklesIcon class="h-6 w-6 text-fuchsia-600 shrink-0 mt-1" />
              <div>
                <h4 class="font-semibold text-slate-900">{{ s.title }}</h4>
                <p class="text-slate-600 text-sm">{{ s.description }}</p>
              </div>
            </li>
          </ul>
        </div>

        <div
          class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6"
        >
          <h3 class="text-xl font-bold text-slate-900 mb-4">核心目标</h3>
          <ul class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <li
              v-for="g in goals"
              :key="g.title"
              class="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/60"
            >
              <div class="bg-indigo-100 p-2 rounded-xl border border-indigo-200/80">
                <component :is="g.icon" class="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h4 class="font-semibold text-slate-900">{{ g.title }}</h4>
                <p class="text-slate-600 text-sm">{{ g.description }}</p>
              </div>
            </li>
          </ul>
        </div>

        <div
          class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6"
        >
          <h3 class="text-xl font-bold text-slate-900 mb-4">设计原则</h3>
          <ul class="space-y-3 text-slate-700 text-sm">
            <li v-for="p in principles" :key="p" class="flex items-start gap-3">
              <svg
                class="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>{{ p }}</span>
            </li>
          </ul>
        </div>

        <div
          class="bg-slate-900/80 text-slate-100 rounded-3xl border border-white/10 shadow-xl p-6"
        >
          <h3 class="text-xl font-bold text-slate-100 mb-3">Prompt 骨架示例</h3>
          <pre class="font-mono text-sm whitespace-pre-wrap"><code>{{ skeleton }}</code></pre>
        </div>
      </div>

      <div class="space-y-6">
        <div
          class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6"
        >
          <h3 class="text-lg font-bold text-slate-900 mb-3">ICS 模板</h3>
          <pre class="font-mono text-sm whitespace-pre-wrap"><code>{{ templateIcs }}</code></pre>
        </div>
        <div
          class="bg-white/70 backdrop-blur-md border border-slate-200/30 rounded-3xl shadow-xl p-6"
        >
          <h3 class="text-lg font-bold text-slate-900 mb-3">RAG 关键规则</h3>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li
              v-for="r in ragRules"
              :key="r.title"
              class="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/60"
            >
              <div class="bg-emerald-100 p-2 rounded-xl border border-emerald-200/80">
                <component :is="r.icon" class="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h4 class="font-semibold text-slate-900">{{ r.title }}</h4>
                <p class="text-slate-600 text-sm">{{ r.description }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div
          class="bg-slate-900/80 text-slate-100 rounded-3xl border border-white/10 shadow-xl p-6"
        >
          <div class="flex items-center gap-2 mb-3">
            <ChatBubbleLeftRightIcon class="h-6 w-6 text-emerald-300" />
            <h3 class="text-lg font-bold text-slate-100">少样本示例</h3>
          </div>
          <pre class="font-mono text-sm whitespace-pre-wrap"><code>{{ miniExample }}</code></pre>
        </div>
        <div
          class="bg-slate-900/80 text-slate-100 rounded-3xl border border-white/10 shadow-xl p-6"
        >
          <h3 class="text-lg font-bold text-slate-100 mb-3">RAG Prompt 模板</h3>
          <pre class="font-mono text-sm whitespace-pre-wrap"><code>{{ ragPrompt }}</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>
