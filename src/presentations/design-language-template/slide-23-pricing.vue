<script setup lang='ts'>
defineProps<{ isActive?: boolean; isPreview?: boolean }>()

type Plan = { name: string; price: string; highlight?: boolean; features: string[] }

const plans: Plan[] = [
  {
    name: '入门版',
    price: '¥ 0',
    features: ['基础功能', '社区支持', '单项目'],
  },
  {
    name: '专业版',
    price: '¥ 99 / 月',
    highlight: true,
    features: ['高级功能', '优先支持', '多项目'],
  },
  {
    name: '企业版',
    price: '定制报价',
    features: ['专属顾问', '私有部署', 'SLA 保证'],
  },
]
</script>

<template>
  <section class="container mx-auto max-w-6xl px-6 md:px-8 lg:px-12 py-12 lg:py-16">
    <div class="mb-8 text-center">
      <h2 class="inline-block text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent))]">
        定价方案（占位）
      </h2>
      <p class="mt-2 text-slate-600">展示不同套餐与权益，辅助商务沟通</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="p in plans"
        :key="p.name"
        class="rounded-3xl border border-slate-200/30 bg-white/70 backdrop-blur-md shadow-xl p-6 flex flex-col"
        :class="p.highlight ? 'ring-2 ring-[rgb(var(--accent))]' : ''"
      >
        <div class="flex items-baseline justify-between">
          <h3 class="text-xl font-bold text-slate-900">{{ p.name }}</h3>
          <span class="text-sm font-semibold text-[rgb(var(--accent))]" v-if="p.highlight">推荐</span>
        </div>
        <div class="mt-2 text-3xl font-black text-slate-900">{{ p.price }}</div>
        <ul class="mt-4 space-y-2 text-slate-700 text-sm flex-1">
          <li v-for="f in p.features" :key="f" class="flex items-center gap-2">
            <span class="inline-block h-2 w-2 rounded-full bg-[rgb(var(--accent))]"></span>
            <span>{{ f }}</span>
          </li>
        </ul>
        <button class="mt-6 rounded-full bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent))] px-4 py-2 text-white shadow hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-300">
          了解更多
        </button>
      </div>
    </div>
  </section>
</template>

