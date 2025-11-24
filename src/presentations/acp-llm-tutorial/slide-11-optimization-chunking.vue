<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const challenges = [
  {
    title: '切片过大 (Too Large)',
    description: '引入过多无关的“噪声”信息，稀释了核心答案的浓度，干扰模型判断。',
  },
  {
    title: '切片过小 (Too Small)',
    description: '关键信息被无情截断，导致上下文不完整，模型无法形成完整理解。',
  },
]

const solutions = [
  {
    title: '语义切分 (Semantic Chunking)',
    description: '根据段落、句子或特定分隔符进行切分，最大程度保证语义的完整性。',
  },
  {
    title: '重叠切块 (Overlapping Chunks)',
    description: '在相邻切片间保留一部分重叠内容，有效缓解上下文被割裂的问题。',
  },
]
</script>

<template>
  <section class="h-full w-full flex flex-col justify-center p-8">
    <div class="text-center mb-8">
      <h2 class="text-4xl xl:text-5xl font-extrabold tracking-tight">
        <span
          class="bg-gradient-to-r from-fuchsia-500 to-indigo-500 bg-clip-text text-transparent"
        >优化策略 (三)：精细化文档切片</span>
      </h2>
      <p class="mt-2 text-lg text-slate-600 max-w-2xl mx-auto">切片的质量，直接决定了模型能拿到多高质量的“参考资料”。</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Challenges -->
      <div class="bg-white/60 backdrop-blur-sm p-6 border rounded-xl shadow-lg">
        <h3 class="text-xl font-bold text-slate-800 mb-4">挑战：不合适的切片尺寸</h3>
        <ul class="space-y-4">
          <li v-for="(item, i) in challenges" :key="i" class="flex items-start gap-3">
            <span class="text-red-500 text-lg mt-1">❌</span>
            <div>
              <h4 class="font-semibold text-slate-900">{{ item.title }}</h4>
              <p class="text-slate-600 text-sm">{{ item.description }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Solutions -->
      <div class="bg-white/60 backdrop-blur-sm p-6 border border-emerald-500/50 rounded-xl shadow-lg">
        <h3 class="text-xl font-bold text-emerald-800 mb-4">对策：智能切片策略</h3>
        <ul class="space-y-4">
          <li v-for="(item, i) in solutions" :key="i" class="flex items-start gap-3">
            <span class="text-green-500 text-lg mt-1">✅</span>
            <div>
              <h4 class="font-semibold text-slate-900">{{ item.title }}</h4>
              <p class="text-slate-600 text-sm">{{ item.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-6 text-center">
      <p
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/40 backdrop-blur-md text-slate-700 text-sm"
      >
        💡 核心目标：确保每个切片都是一个“高信噪比、语义自洽”的信息单元。
      </p>
    </div>
  </section>
</template>
