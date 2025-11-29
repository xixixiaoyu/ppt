<script setup lang="ts">
import Section from '@/shared/ui/Section.vue'
import Card from '@/shared/ui/Card.vue'
import HeadingGradient from '@/shared/ui/HeadingGradient.vue'
import {
  MicrophoneIcon,
  VideoCameraIcon,
  CodeBracketIcon,
  EyeIcon,
} from '@heroicons/vue/24/outline'

defineProps<{ isActive?: boolean; isPreview?: boolean }>()
</script>

<template>
  <Section>
    <Card padding="xl" class="grid place-items-center h-full">
      <div
        class="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-6 h-full"
      >
        <!-- Header -->
        <div class="text-center mb-2">
          <HeadingGradient
            :level="2"
            size="4xl"
            palette="indigo-fuchsia-emerald"
            class="leading-tight font-bold tracking-tight"
          >
            多模态大模型 (LMMs)
          </HeadingGradient>
          <p class="text-lg text-slate-600 font-medium mt-2">
            Multimodality: 超越纯文本，赋予模型"看"、"听"、"说"的能力
          </p>
        </div>

        <!-- Main Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
          <!-- Column 1: Vision (Images) -->
          <div class="flex flex-col gap-4">
            <div
              class="bg-blue-50/50 backdrop-blur-sm rounded-xl p-4 border border-blue-100 shadow-sm flex-1 flex flex-col"
            >
              <div
                class="flex items-center gap-3 mb-3 pb-2 border-b border-blue-100"
              >
                <div class="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <EyeIcon class="w-6 h-6" />
                </div>
                <h3 class="text-lg font-bold text-slate-800">
                  视觉理解 (Vision)
                </h3>
              </div>
              <ul class="space-y-3 text-sm text-slate-700">
                <li class="flex gap-2">
                  <span class="text-blue-500 font-bold">•</span>
                  <span
                    ><strong>VQA (Visual QA):</strong>
                    询问图片内容，如"图中有几个人？"。</span
                  >
                </li>
                <li class="flex gap-2">
                  <span class="text-blue-500 font-bold">•</span>
                  <span
                    ><strong>OCR & 文档分析:</strong>
                    提取表格、手写体、发票信息。</span
                  >
                </li>
                <li class="flex gap-2">
                  <span class="text-blue-500 font-bold">•</span>
                  <span
                    ><strong>物体检测 (Detection):</strong>
                    识别并定位图中物体坐标。</span
                  >
                </li>
              </ul>
              <div class="mt-auto pt-3">
                <div
                  class="text-xs font-mono bg-blue-100/50 text-blue-800 px-2 py-1 rounded"
                >
                  GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro
                </div>
              </div>
            </div>
          </div>

          <!-- Column 2: Audio (Speech) -->
          <div class="flex flex-col gap-4">
            <div
              class="bg-purple-50/50 backdrop-blur-sm rounded-xl p-4 border border-purple-100 shadow-sm flex-1 flex flex-col"
            >
              <div
                class="flex items-center gap-3 mb-3 pb-2 border-b border-purple-100"
              >
                <div class="p-2 bg-purple-100 rounded-lg text-purple-600">
                  <MicrophoneIcon class="w-6 h-6" />
                </div>
                <h3 class="text-lg font-bold text-slate-800">
                  语音交互 (Audio)
                </h3>
              </div>
              <ul class="space-y-3 text-sm text-slate-700">
                <li class="flex gap-2">
                  <span class="text-purple-500 font-bold">•</span>
                  <span
                    ><strong>原生多模态:</strong>
                    端到端处理音频，包含语气、语速、情感。</span
                  >
                </li>
                <li class="flex gap-2">
                  <span class="text-purple-500 font-bold">•</span>
                  <span
                    ><strong>STT (Speech-to-Text):</strong>
                    高精度会议记录、字幕生成。</span
                  >
                </li>
                <li class="flex gap-2">
                  <span class="text-purple-500 font-bold">•</span>
                  <span
                    ><strong>TTS (Text-to-Speech):</strong>
                    生成逼真的人声语音。</span
                  >
                </li>
              </ul>
              <div class="mt-auto pt-3">
                <div
                  class="text-xs font-mono bg-purple-100/50 text-purple-800 px-2 py-1 rounded"
                >
                  OpenAI Realtime API, Whisper, ElevenLabs
                </div>
              </div>
            </div>
          </div>

          <!-- Column 3: Advanced & Video -->
          <div class="flex flex-col gap-4">
            <div
              class="bg-emerald-50/50 backdrop-blur-sm rounded-xl p-4 border border-emerald-100 shadow-sm flex-1 flex flex-col"
            >
              <div
                class="flex items-center gap-3 mb-3 pb-2 border-b border-emerald-100"
              >
                <div class="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                  <VideoCameraIcon class="w-6 h-6" />
                </div>
                <h3 class="text-lg font-bold text-slate-800">视频与代码</h3>
              </div>
              <ul class="space-y-3 text-sm text-slate-700">
                <li class="flex gap-2">
                  <span class="text-emerald-500 font-bold">•</span>
                  <span
                    ><strong>视频分析:</strong>
                    理解长视频内容，提取关键帧和摘要。</span
                  >
                </li>
                <li class="flex gap-2">
                  <span class="text-emerald-500 font-bold">•</span>
                  <span
                    ><strong>截图转代码:</strong>
                    上传UI设计图，直接生成HTML/Tailwind代码。</span
                  >
                </li>
                <li class="flex gap-2">
                  <span class="text-emerald-500 font-bold">•</span>
                  <span
                    ><strong>具身智能 (Embodied):</strong>
                    机器人通过摄像头理解环境并操作。</span
                  >
                </li>
              </ul>
              <div class="mt-auto pt-3">
                <div
                  class="text-xs font-mono bg-emerald-100/50 text-emerald-800 px-2 py-1 rounded"
                >
                  Gemini 1.5 (1M+ Context), Sora (Gen)
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Application Banner -->
        <div
          class="bg-gradient-to-r from-slate-50 to-white rounded-xl p-4 border border-slate-200 flex items-center justify-between shadow-sm"
        >
          <div class="flex items-center gap-4">
            <div class="p-3 bg-indigo-100 rounded-full text-indigo-600">
              <CodeBracketIcon class="w-6 h-6" />
            </div>
            <div>
              <h4 class="font-bold text-slate-800">
                Killer App: 截图写代码 (Screenshot to Code)
              </h4>
              <p class="text-sm text-slate-600">
                将设计稿或网页截图发送给多模态模型，不仅识别文字，还能理解布局结构，直接输出前端代码。
              </p>
            </div>
          </div>
          <div class="hidden md:block text-4xl opacity-20">🎨 ➡️ 💻</div>
        </div>
      </div>
    </Card>
  </Section>
</template>
