<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const quote = '我们公司项目管理应该用什么工具？'
const author = '一位新同事的提问'

const title = 'LLM 局限性与使用须知'
const subtitle = '理解模型边界，构建可靠工程实践'

const mustKnow = [
  '回答可能包含“幻觉”，需结合事实校验',
  '知识库有截止日期，无法获取最新信息',
  '输入长度受限，无法处理大规模私有知识',
  '输出包含随机性，结果难以稳定复现',
  '需结合外部知识源，并提供答案出处',
  '私有化部署成本高，数据安全需谨慎',
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="text-center mb-10">
      <h2
        class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
      >
        {{ title }}
      </h2>
      <p class="mt-2 text-slate-600 max-w-3xl mx-auto">{{ subtitle }}</p>
    </div>
    <div class="max-w-4xl mx-auto">
      <div
        class="rounded-3xl border border-slate-200/40 bg-white/80 backdrop-blur-md shadow-2xl p-8 md:p-12 transition hover:-translate-y-0.5"
      >
        <blockquote
          class="text-3xl md:text-4xl leading-tight tracking-tight font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
        >
          “{{ quote }}”
        </blockquote>
        <div class="mt-8 flex items-center justify-center">
          <div class="text-slate-600">
            — <span class="font-medium text-slate-700">{{ author }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 max-w-5xl mx-auto">
      <div
        class="bg-white/80 backdrop-blur-md border border-slate-200/40 rounded-3xl shadow-xl p-8"
      >
        <ol class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          <li
            v-for="(it, index) in mustKnow"
            :key="it"
            class="flex items-start rounded-2xl p-4 bg-slate-50/70 border border-slate-200/60 transition hover:-translate-y-0.5 hover:bg-slate-50"
          >
            <div
              class="flex-shrink-0 h-9 w-9 flex items-center justify-center rounded-full bg-white border border-slate-200/70 text-slate-700 font-semibold text-sm shadow-sm"
            >
              {{ index + 1 }}
            </div>
            <p class="ml-4 text-slate-800 leading-relaxed text-base">
              {{ it }}
            </p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
