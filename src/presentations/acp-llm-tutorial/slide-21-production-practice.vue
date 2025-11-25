<script setup lang="ts">
import { EyeIcon, ArchiveBoxIcon, BanknotesIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import Section from '@/shared/ui/Section.vue'
import Card from '@/shared/ui/Card.vue'
import HeadingGradient from '@/shared/ui/HeadingGradient.vue'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const practices = [
  {
    icon: EyeIcon,
    title: '可观测性：Tracing 优于 Logging',
    description:
      '传统的日志只能记录离散事件，而 Tracing 能将 RAG 的检索、重排、生成等多个环节串联成一个完整的调用链。这对于定位“答案为何出错”至关重要。',
    recommendation:
      '工具选型：LangSmith, OpenTelemetry。它们能可视化每一次请求的内部细节，是调试和优化的必备武器。',
    color: 'sky',
  },
  {
    icon: ArchiveBoxIcon,
    title: '版本控制：Prompt + 模型 + 数据',
    description:
      'LLM 应用的版本不仅是代码。更要对提示词 (Prompt)、模型版本和评估数据集进行一体化管理。将 Prompt 视为代码，纳入 Git 管理，确保变更可追溯、可回滚。',
    recommendation:
      '实践“Prompt-as-Code”，建立 Prompt 的版本化、测试和部署流程，是保障生产稳定性的基础。',
    color: 'indigo',
  },
  {
    icon: BanknotesIcon,
    title: '成本控制：模型路由与语义缓存',
    description:
      '这是控制 LLM 运营成本的组合拳。模型路由根据任务复杂度选择不同成本的模型；语义缓存则对相似的重复问题直接返回缓存结果，节省 Token 消耗。',
    code: `// 语义缓存伪代码
query_embedding = client.embed(query)

similar_query = redis.vector_search(query_embedding)

if similar_query and similarity(query, similar_query) > 0.95:
  return redis.get(similar_query.result_key) // 命中缓存
else:
  // 调用 LLM，并将结果存入缓存
`,
    color: 'amber',
  },
  {
    icon: ArrowPathIcon,
    title: '持续优化：打造数据飞轮',
    description:
      '生产环境是收集高质量数据的最佳场所。通过记录用户反馈（点赞/点踩）和模型失败案例 (Failure Cases)，持续扩充和优化你的评估集与微调数据集。',
    recommendation:
      '建立从“生产反馈”到“数据标注”再到“模型迭代”的自动化或半自动化闭环，驱动应用效果持续提升。',
    color: 'emerald',
  },
]
</script>

<template>
  <Section>
    <div class="text-center mb-12 max-w-4xl mx-auto">
      <HeadingGradient :level="2" size="5xl"
        >LLM 应用生产实践：从“能用”到“好用”与“可控”</HeadingGradient
      >
      <p class="text-lg text-slate-600 mt-3">
        部署只是开始。确保应用的稳定性、可维护性并控制成本，是生产环境中的核心挑战。
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl mx-auto">
      <Card
        v-for="practice in practices"
        :key="practice.title"
        padding="lg"
        class="flex flex-col transition hover:-translate-y-0.5"
      >
        <div class="flex items-center gap-4 mb-4">
          <div :class="`bg-${practice.color}-100`" class="p-3 rounded-xl">
            <component :is="practice.icon" :class="`text-${practice.color}-600`" class="h-8 w-8" />
          </div>
          <h3 class="text-xl font-bold text-slate-800">
            {{ practice.title }}
          </h3>
        </div>
        <p class="text-slate-600 text-sm mb-3 flex-grow">{{ practice.description }}</p>
        <div v-if="practice.code" class="mb-3">
          <div
            class="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 shadow-inner text-xs"
          >
            <div class="px-4 py-2 border-b border-slate-600/80">
              <span class="text-xs text-slate-400 font-mono">python</span>
            </div>
            <pre
              class="language-python p-4 text-white/80"
            ><code v-html="practice.code.trim()"></code></pre>
          </div>
        </div>
        <div
          :class="`bg-${practice.color}-50 border-l-4 border-${practice.color}-400`"
          class="p-3 rounded-r-lg"
        >
          <p class="text-sm font-medium" :class="`text-${practice.color}-800`">
            {{ practice.recommendation }}
          </p>
        </div>
      </Card>
    </div>
  </Section>
</template>
