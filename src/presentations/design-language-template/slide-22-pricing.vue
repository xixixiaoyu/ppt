<script setup lang='ts'>
import Section from '@/shared/ui/Section.vue'
import Card from '@/shared/ui/Card.vue'
import HeadingGradient from '@/shared/ui/HeadingGradient.vue'
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
  <Section>
    <div class="mb-8 text-center">
      <HeadingGradient :level="2" size="5xl">定价方案（占位）</HeadingGradient>
      <p class="mt-2 text-slate-600">展示不同套餐与权益，辅助商务沟通</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card
        v-for="p in plans"
        :key="p.name"
        padding="md"
        class="flex flex-col"
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
        <button class="mt-6 rounded-full bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent))] px-4 py-2 text-white shadow hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent/50">
          了解更多
        </button>
      </Card>
    </div>
  </Section>
</template>
