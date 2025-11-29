<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{ isActive?: boolean; isPreview?: boolean }>()

// 定义统一的数据接口
interface QuizOption {
  id: string
  text: string
  correct?: boolean
  votes?: number
}

interface QuizData {
  question: string
  options: QuizOption[]
  explanation?: string
}

// 问答类型配置
const quizTypes = [
  { id: 'multiple', name: '单选题', icon: '🔘' },
  { id: 'multiple-choice', name: '多选题', icon: '☑️' },
  { id: 'true-false', name: '判断题', icon: '✅❌' },
  { id: 'poll', name: '投票', icon: '📊' },
]

const activeQuizType = ref('multiple')

// 单选题数据
const multipleChoiceData: QuizData = {
  question: '以下哪个是 Vue 3 的主要特性？',
  options: [
    { id: 'a', text: 'Composition API', correct: true },
    { id: 'b', text: 'Class Components', correct: false },
    { id: 'c', text: 'jQuery Integration', correct: false },
    { id: 'd', text: 'Angular Directives', correct: false },
  ],
  explanation:
    'Composition API 是 Vue 3 引入的主要特性，提供了更灵活的代码组织方式。',
}

// 多选题数据
const multipleSelectData: QuizData = {
  question: '以下哪些是现代前端框架的特点？（多选）',
  options: [
    { id: 'a', text: '组件化开发', correct: true },
    { id: 'b', text: '响应式设计', correct: true },
    { id: 'c', text: '服务器端渲染', correct: true },
    { id: 'd', text: '仅支持 IE 浏览器', correct: false },
  ],
  explanation:
    '现代前端框架都支持组件化、响应式设计和 SSR，但通常不再支持 IE 浏览器。',
}

// 判断题数据
const trueFalseData: QuizData = {
  question: 'Vue 3 完全向后兼容 Vue 2 的所有 API。',
  options: [
    { id: 'true', text: '正确', correct: false },
    { id: 'false', text: '错误', correct: true },
  ],
  explanation:
    'Vue 3 有一些破坏性变更，不完全向后兼容 Vue 2，但提供了迁移工具。',
}

// 投票数据
const pollData: QuizData = {
  question: '你最喜欢的前端框架是什么？',
  options: [
    { id: 'a', text: 'Vue.js', votes: 45 },
    { id: 'b', text: 'React', votes: 38 },
    { id: 'c', text: 'Angular', votes: 12 },
    { id: 'd', text: 'Svelte', votes: 5 },
  ],
}

// 用户选择状态
const selectedOptions = ref<string[]>([])
const showResult = ref(false)
const userVotes = ref<number[]>([0, 0, 0, 0])

// 获取当前数据
const currentData = computed(() => {
  switch (activeQuizType.value) {
    case 'multiple':
      return multipleChoiceData
    case 'multiple-choice':
      return multipleSelectData
    case 'true-false':
      return trueFalseData
    case 'poll':
      return pollData
    default:
      return multipleChoiceData
  }
})

// 获取当前类型的标题
const currentTitle = computed(() => {
  const titles = {
    multiple: '单选题',
    'multiple-choice': '多选题',
    'true-false': '判断题',
    poll: '投票',
  }
  return titles[activeQuizType.value as keyof typeof titles]
})

// 判断是否为投票类型
const isPoll = computed(() => activeQuizType.value === 'poll')

// 处理选项选择
const handleOptionSelect = (optionId: string) => {
  if (props.isPreview || showResult.value) return

  if (activeQuizType.value === 'multiple') {
    selectedOptions.value = [optionId]
  } else if (activeQuizType.value === 'multiple-choice') {
    const index = selectedOptions.value.indexOf(optionId)
    if (index > -1) {
      selectedOptions.value.splice(index, 1)
    } else {
      selectedOptions.value.push(optionId)
    }
  } else if (activeQuizType.value === 'true-false') {
    selectedOptions.value = [optionId]
  } else if (activeQuizType.value === 'poll') {
    const index = currentData.value.options.findIndex(
      (opt: QuizOption) => opt.id === optionId
    )
    if (index > -1) {
      userVotes.value[index]++
    }
  }
}

// 提交答案
const submitAnswer = () => {
  if (props.isPreview) return
  showResult.value = true
}

// 重置
const reset = () => {
  selectedOptions.value = []
  showResult.value = false
  userVotes.value = [0, 0, 0, 0]
}

// 计算投票总数
const totalVotes = computed(() => userVotes.value.reduce((a, b) => a + b, 0))

// 计算投票百分比
const votePercentages = computed(() =>
  userVotes.value.map(votes =>
    totalVotes.value ? Math.round((votes / totalVotes.value) * 100) : 0
  )
)

// 检查答案是否正确
const isCorrect = computed(() => {
  if (isPoll.value) return null

  const correctOptions = currentData.value.options
    .filter((opt: QuizOption) => opt.correct)
    .map((opt: QuizOption) => opt.id)

  if (activeQuizType.value === 'multiple-choice') {
    return (
      selectedOptions.value.length === correctOptions.length &&
      selectedOptions.value.every(id => correctOptions.includes(id))
    )
  } else {
    return (
      selectedOptions.value.length === 1 &&
      correctOptions.includes(selectedOptions.value[0])
    )
  }
})

// 获取选项样式类
const getOptionClass = (option: QuizOption) => {
  const isSelected = selectedOptions.value.includes(option.id)
  const isCorrectOption = option.correct

  if (isPoll.value) {
    return isSelected
      ? 'border-accent bg-accent/10'
      : 'border-slate-200/30 bg-white/70'
  }

  if (showResult.value) {
    if (isCorrectOption) {
      return 'border-emerald-500 bg-emerald-50 text-emerald-900'
    } else if (isSelected && !isCorrectOption) {
      return 'border-red-500 bg-red-50 text-red-900'
    } else {
      return 'border-slate-200/30 bg-white/70 opacity-60'
    }
  }

  return isSelected
    ? 'border-accent bg-accent/10'
    : 'border-slate-200/30 bg-white/70 hover:bg-accent/5'
}
</script>

<template>
  <section
    class="container mx-auto max-w-4xl px-6 md:px-8 lg:px-12 py-12 lg:py-16"
  >
    <div class="mb-8">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
      >
        问答测验模板
      </h2>
      <p class="mt-2 text-slate-600">互动式问答，支持多种题型和实时反馈。</p>
    </div>

    <!-- 问答类型选择器 -->
    <div class="flex flex-wrap justify-center gap-2 mb-8">
      <button
        v-for="type in quizTypes"
        :key="type.id"
        @click="
          reset()
          activeQuizType = type.id
        "
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
        :class="
          activeQuizType === type.id
            ? 'bg-gradient-to-r from-accent to-accent text-white shadow-lg'
            : 'bg-white/60 border border-white/40 text-slate-700 hover:bg-white/70'
        "
      >
        <span>{{ type.icon }}</span>
        <span>{{ type.name }}</span>
      </button>
    </div>

    <!-- 问答内容 -->
    <div
      class="rounded-3xl border border-slate-200/30 bg-white/70 backdrop-blur-md shadow-xl p-8"
    >
      <!-- 问题 -->
      <h3 class="text-xl md:text-2xl font-bold text-slate-900 mb-6">
        {{ currentData.question }}
      </h3>

      <!-- 选项 -->
      <div class="space-y-3 mb-6">
        <div
          v-for="option in currentData.options"
          :key="option.id"
          @click="handleOptionSelect(option.id)"
          class="rounded-2xl border p-4 cursor-pointer transition-all"
          :class="getOptionClass(option)"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <!-- 选择指示器 -->
              <div
                class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                :class="
                  selectedOptions.includes(option.id)
                    ? 'border-accent bg-accent'
                    : 'border-slate-400'
                "
              >
                <div
                  v-if="selectedOptions.includes(option.id)"
                  class="w-2 h-2 rounded-full bg-white"
                ></div>
              </div>

              <!-- 多选框 -->
              <div
                v-if="activeQuizType === 'multiple-choice'"
                class="w-5 h-5 rounded border-2 flex items-center justify-center"
                :class="
                  selectedOptions.includes(option.id)
                    ? 'border-accent bg-accent'
                    : 'border-slate-400'
                "
              >
                <svg
                  v-if="selectedOptions.includes(option.id)"
                  class="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>

              <span class="text-lg">{{ option.text }}</span>
            </div>

            <!-- 投票结果 -->
            <div v-if="isPoll && showResult" class="flex items-center gap-2">
              <span class="text-sm font-medium text-slate-600">
                {{
                  votePercentages[
                    currentData.options.findIndex(
                      (opt: QuizOption) => opt.id === option.id
                    )
                  ]
                }}%
              </span>
              <div class="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-accent to-accent transition-all duration-500"
                  :style="{
                    width:
                      votePercentages[
                        currentData.options.findIndex(
                          (opt: QuizOption) => opt.id === option.id
                        )
                      ] + '%',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 结果显示 -->
      <div
        v-if="showResult && !isPoll"
        class="mb-6 p-4 rounded-2xl"
        :class="
          isCorrect
            ? 'bg-emerald-50 border border-emerald-200'
            : 'bg-amber-50 border border-amber-200'
        "
      >
        <div class="flex items-center gap-2 mb-2">
          <span class="text-lg">{{ isCorrect ? '✅' : '❌' }}</span>
          <span
            class="font-semibold"
            :class="isCorrect ? 'text-emerald-900' : 'text-amber-900'"
          >
            {{ isCorrect ? '回答正确！' : '回答错误' }}
          </span>
        </div>
        <p
          class="text-sm"
          :class="isCorrect ? 'text-emerald-800' : 'text-amber-800'"
        >
          {{ currentData.explanation || '' }}
        </p>
      </div>

      <!-- 投票结果 -->
      <div
        v-else-if="isPoll && showResult"
        class="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200"
      >
        <p class="text-sm text-slate-600 mb-2">总投票数：{{ totalVotes }} 票</p>
      </div>

      <!-- 操作按钮 -->
      <div class="flex gap-3">
        <button
          v-if="!showResult"
          @click="submitAnswer"
          :disabled="selectedOptions.length === 0"
          class="rounded-full bg-gradient-to-r from-accent to-accent px-6 py-3 text-white font-medium shadow-lg transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isPoll ? '查看结果' : '提交答案' }}
        </button>

        <button
          @click="reset"
          class="rounded-full border border-slate-300 bg-white/60 px-6 py-3 text-slate-700 font-medium shadow transition hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
        >
          重置
        </button>
      </div>
    </div>
  </section>
</template>
