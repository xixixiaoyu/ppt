<script setup lang="ts">
import Section from '@/shared/ui/Section.vue'
import Card from '@/shared/ui/Card.vue'
import HeadingGradient from '@/shared/ui/HeadingGradient.vue'
import WaveGlow from '@/shared/ui/WaveGlow.vue'
defineProps<{ isActive?: boolean; isPreview?: boolean }>()
</script>

<template>
  <Section max="5xl" p="xl">
    <Card rounded="[2rem]" padding="xl" class="text-center">
      <WaveGlow class="opacity-60" />
      <HeadingGradient :level="2" size="5xl" palette="indigo-fuchsia-emerald" class="relative z-10">
        准备好应用到你的演示了吗？
      </HeadingGradient>
      <p class="relative z-10 mt-4 text-slate-700">按钮仅作示例，无实际操作。</p>
      <div class="relative z-10 mt-8 flex items-center justify-center gap-4">
        <button
          class="rounded-full bg-gradient-to-r from-accent to-accent px-6 py-3 text-white shadow-lg transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/50"
        >
          继续探索
        </button>
        <button
          class="rounded-full border border-white/40 bg-white/60 px-6 py-3 text-slate-800 backdrop-blur-md hover:bg-white/70"
        >
          查看示例
        </button>
      </div>
    </Card>
  </Section>
</template>
