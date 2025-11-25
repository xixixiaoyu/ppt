<script setup lang="ts">
import {
  CloudArrowUpIcon,
  ServerStackIcon,
  CodeBracketIcon,
  BoltIcon,
  CubeTransparentIcon,
} from '@heroicons/vue/24/outline'
import Section from '@/shared/ui/Section.vue'
import Card from '@/shared/ui/Card.vue'
import HeadingGradient from '@/shared/ui/HeadingGradient.vue'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const options = [
  {
    icon: CodeBracketIcon,
    title: '方案一：Serverless (Vercel AI SDK / 函数计算)',
    description:
      '前端直接集成 Vercel AI SDK 或通过云函数调用模型 API，实现快速开发和自动扩缩容。适合原型验证和中低流量应用。',
    codeLanguage: 'typescript',
    code: `// 前端使用 Vercel AI SDK，轻松处理流式响应
import { useChat } from 'ai/react'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  // ... UI 渲染
}`,
    pros: ['开发体验好，前端友好', '零运维，按需付费', '天然支持流式响应'],
    cons: ['冷启动延迟较高', '计算资源和执行时间受限'],
  },
  {
    icon: ServerStackIcon,
    title: '方案二：容器化自托管 (Docker + vLLM/TGI)',
    description:
      '将模型及推理服务（如 vLLM）打包成 Docker 镜像，部署在自己的 GPU 服务器或云主机上。提供最大灵活性和控制力。',
    codeLanguage: 'dockerfile',
    code: `FROM nvidia/cuda:12.1.0-runtime-ubuntu22.04

# 安装 Python 和 vLLM
RUN pip install vllm

# 复制模型权重
COPY ./qwen-7b-chat /app/qwen-7b-chat

# 启动 vLLM 推理服务
CMD ["python", "-m", "vllm.entrypoints.openai.api_server", \
     "--model", "/app/qwen-7b-chat", "--host", "0.0.0.0"]`,
    pros: ['完全控制环境和模型', '无平台限制，性能可压榨到极致', '可集成到现有 K8s 体系'],
    cons: ['运维复杂，需 GPU 资源管理经验', '扩展性和高可用需自行构建'],
  },
  {
    icon: CloudArrowUpIcon,
    title: '方案三：专用推理平台 (Anyscale, Together)',
    description:
      '使用 Anyscale, Together AI 等专门为 LLM 推理优化的第三方服务。它们通过批量处理、量化等技术实现极致的成本和性能。',
    codeLanguage: 'python',
    code: `// 调用专用推理平台的 API，通常与 OpenAI 兼容
import openai

client = openai.OpenAI(
  api_key="your_api_key",
  base_url="https://api.together.xyz/v1/",
)

chat_completion = client.chat.completions.create(...)`,
    pros: ['极致的性能和性价比', '按量付费，无需关心底层硬件', '通常提供 Serverless API'],
    cons: ['平台锁定风险', '数据隐私和安全需评估'],
  },
]

const bestPractices = {
  title: '生产最佳实践',
  items: [
    {
      icon: BoltIcon,
      name: '流式输出 (Streaming) 是标配',
      description:
        '通过流式响应显著降低用户感知的首字延迟 (Time to First Token)，是提升体验的关键。后端需使用异步框架 (FastAPI, aiohttp) 实现，前端配合处理数据流。',
    },
    {
      icon: CubeTransparentIcon,
      name: '模型网关 (Model Gateway)',
      description:
        '构建一个统一的入口服务，对内部分发请求到不同模型（如复杂任务用 GPT-4，简单任务用 Qwen）。实现路由、鉴权、限流、缓存和日志记录，解耦业务与模型。',
    },
    {
      icon: CodeBracketIcon,
      name: '监控关键指标',
      description:
        '除了常规的 QPS、延迟和错误率，还需关注 TTFT (首字延迟)、Tokens/Sec (吞吐率)、并发数和 GPU 利用率，这些是衡量 LLM 服务性能和成本的核心。',
    },
  ],
}
</script>

<template>
  <Section>
    <div class="text-center mb-12">
      <HeadingGradient :level="2" size="5xl">LLM 应用部署：从原型到生产</HeadingGradient>
      <p class="mt-3 text-slate-600 max-w-3xl mx-auto">
        选择合适的部署策略，平衡成本、性能与运维复杂度，是 LLM 应用走向成功的关键一步。
      </p>
    </div>

    <div class="w-full max-w-7xl mx-auto space-y-10">
      <!-- Deployment Options -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card
          v-for="option in options"
          :key="option.title"
          padding="md"
          class="flex flex-col transition hover:-translate-y-0.5"
        >
          <div class="flex items-center gap-3 mb-3">
            <div class="bg-indigo-100 p-2 rounded-lg">
              <component :is="option.icon" class="h-7 w-7 text-indigo-600" />
            </div>
            <h3 class="text-lg font-bold text-slate-900">{{ option.title }}</h3>
          </div>
          <p class="text-slate-700 text-sm mb-4 flex-grow">{{ option.description }}</p>
          <div class="my-4">
            <div
              class="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 shadow-inner text-xs"
            >
              <div class="px-4 py-2 border-b border-slate-600/80">
                <span class="text-xs text-slate-400 font-mono">{{ option.codeLanguage }}</span>
              </div>
              <pre
                class="language-python p-4 text-white/80"
              ><code v-html="option.code.trim()"></code></pre>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-slate-200">
            <h4 class="font-semibold text-slate-800 text-sm mb-2">权衡点：</h4>
            <ul class="space-y-1.5 text-xs">
              <li
                v-for="pro in option.pros"
                :key="pro"
                class="flex items-start gap-2 text-emerald-700"
              >
                <span class="font-bold">+</span><span>{{ pro }}</span>
              </li>
              <li
                v-for="con in option.cons"
                :key="con"
                class="flex items-start gap-2 text-rose-700"
              >
                <span class="font-bold">-</span><span>{{ con }}</span>
              </li>
            </ul>
          </div>
        </Card>
      </div>

      <!-- Best Practices -->
      <Card padding="lg" class="bg-slate-50">
        <h3 class="text-2xl font-bold text-slate-800 mb-6 text-center">
          {{ bestPractices.title }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="item in bestPractices.items" :key="item.name" class="text-center">
            <div class="inline-block bg-indigo-100 p-3 rounded-full mb-3">
              <component :is="item.icon" class="h-8 w-8 text-indigo-600" />
            </div>
            <h4 class="font-bold text-slate-900">{{ item.name }}</h4>
            <p class="text-slate-600 text-sm mt-1">{{ item.description }}</p>
          </div>
        </div>
      </Card>
    </div>
  </Section>
</template>
