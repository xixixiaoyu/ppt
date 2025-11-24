<script setup lang="ts">
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

const features = [
  { title: '易读排版', description: '标准间距与字号，信息层级清晰易扫读。' },
  { title: '灵活网格', description: '一到三列自适应，适配不同内容密度。' },
  { title: '轻量交互', description: '悬浮细节、点击反馈，增进参与感。' },
  { title: '可定制主题', description: '支持品牌色与渐变，快速统一风格。' },
  { title: '高对比度配色', description: '保证可访问性，提升整体识读性。' },
  { title: '移动端友好', description: '响应式布局，窄屏展示同样舒适。' },
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-6">
      <h2
        class="inline-block text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent/90 to-accent/70"
      >
        常见模板（占位）
      </h2>
      <p class="mt-2 text-slate-600">常用的“要点网格”版式，适合信息汇总。</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <article
        v-for="(f, i) in features"
        :key="i"
        class="rounded-3xl border border-slate-200/30 bg-white/70 backdrop-blur-md p-6 md:p-8 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
      >
        <div class="flex items-start gap-3">
          <span
            class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/40 bg-gradient-to-r from-accent/20 to-accent/10 text-slate-900"
          ></span>
          <div class="flex-1">
            <h3 class="text-lg md:text-xl font-bold text-slate-900">{{ f.title }}</h3>
            <p class="mt-1 text-sm text-slate-700">{{ f.description }}</p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
